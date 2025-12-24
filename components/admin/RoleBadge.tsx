interface RoleBadgeProps {
  role: string;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  const isAdmin = role === "ADMIN";

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
        isAdmin
          ? "bg-amber-100 text-amber-800"
          : "bg-neutral-100 text-neutral-700"
      }`}
    >
      {role}
    </span>
  );
}
