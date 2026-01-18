export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const {
      shape,
      size,
      finish,
      mounting,
      combinePhotos,
      proofOption,
      customerName,
      customerEmail,
      customerPhone,
      cemetery,
      shipToAddress,
      neededByDate,
      additionalNotes,
      basePrice,
      mountingPrice,
      proofPrice,
      baseFee,
      combineAdjust,
      totalPrice,
      imageUrls,
    } = body;

    // Validate required fields
    if (!shape || !size || !finish || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.email
          ? (await prisma.user.findUnique({ where: { email: session.user.email } }))?.id
          : null,
        shape,
        size,
        finish,
        mounting: mounting || null,
        combinePhotos: combinePhotos || false,
        proofOption: proofOption || null,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        cemetery: cemetery || null,
        shipToAddress: shipToAddress || null,
        neededByDate: neededByDate || null,
        additionalNotes: additionalNotes || null,
        basePrice: parseFloat(basePrice) || 0,
        mountingPrice: parseFloat(mountingPrice) || 0,
        proofPrice: parseFloat(proofPrice) || 0,
        baseFee: parseFloat(baseFee) || 9,
        combineAdjust: parseFloat(combineAdjust) || 0,
        totalPrice: parseFloat(totalPrice) || 0,
        imageUrls: imageUrls || [],
        status: "pending",
      },
    });

    // Send confirmation email to customer
    const emailBody = `
Thank you for your order with Pictures in Ceramic!

Order #${order.id}
Date: ${new Date().toLocaleDateString()}

Order Details:
- Shape: ${shape}
- Size: ${size}
- Finish: ${finish}
${mounting ? `- Mounting: ${mounting}` : ""}
${combinePhotos ? "- Combining multiple photos" : ""}
${proofOption ? `- Proof option: ${proofOption}` : ""}

Customer Information:
- Name: ${customerName}
- Email: ${customerEmail}
${customerPhone ? `- Phone: ${customerPhone}` : ""}
${cemetery ? `- Cemetery: ${cemetery}` : ""}
${shipToAddress ? `- Ship to: ${shipToAddress}` : ""}
${neededByDate ? `- Needed by: ${neededByDate}` : ""}

${additionalNotes ? `Additional Notes: ${additionalNotes}` : ""}

Total Price: $${totalPrice}

We will contact you shortly to confirm your order and arrange for photo submission.

Thank you for choosing Pictures in Ceramic!
    `.trim();

    try {
      await sendEmail({
        to: customerEmail,
        subject: `Order Confirmation #${order.id} - Pictures in Ceramic`,
        text: emailBody,
      });
    } catch (emailError) {
      console.error("Failed to send order confirmation email:", emailError);
      // Don't fail the order submission if email fails
    }

    // Send notification to admin(s)
    const adminEmail = process.env.ADMIN_EMAIL || "info@picturesinceramic.com";
    const adminEmailCC = process.env.ADMIN_EMAIL_CC; // Optional third email

    // Build recipient list - always include main admin, add CC if provided
    const adminRecipients = adminEmailCC
      ? [adminEmail, adminEmailCC]
      : adminEmail;

    const adminEmailBody = `
New Order Received!

Order #${order.id}
Date: ${new Date().toLocaleDateString()}

Order Details:
- Shape: ${shape}
- Size: ${size}
- Finish: ${finish}
${mounting ? `- Mounting: ${mounting}` : ""}
${combinePhotos ? "- Combining multiple photos" : ""}
${proofOption ? `- Proof option: ${proofOption}` : ""}

Customer Information:
- Name: ${customerName}
- Email: ${customerEmail}
${customerPhone ? `- Phone: ${customerPhone}` : ""}
${cemetery ? `- Cemetery: ${cemetery}` : ""}
${shipToAddress ? `- Ship to: ${shipToAddress}` : ""}
${neededByDate ? `- Needed by: ${neededByDate}` : ""}

${additionalNotes ? `Additional Notes: ${additionalNotes}` : ""}

Total Price: $${totalPrice}

${imageUrls && imageUrls.length > 0 ? `Images: ${imageUrls.length} file(s) uploaded` : ""}
    `.trim();

    try {
      await sendEmail({
        to: adminRecipients,
        subject: `New Order #${order.id}`,
        text: adminEmailBody,
      });
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError);
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: "Order submitted successfully!"
    });
  } catch (error: any) {
    console.error("Order submission error:", error);
    return NextResponse.json({
      error: error?.message || "An unexpected error occurred while submitting your order"
    }, { status: 500 });
  }
}
