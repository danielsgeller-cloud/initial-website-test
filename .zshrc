# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/dangeller/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/dangeller/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/dangeller/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/dangeller/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

# Base PATH (keep conda and homebrew at the front)
export PATH=/opt/homebrew/bin:/Users/dangeller/anaconda3/bin:/Users/dangeller/anaconda3/condabin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

# -----------------------------
# Oh My Zsh core setup
# -----------------------------
export ZSH="$HOME/.oh-my-zsh"

# Theme that shows git branch in the prompt
# robbyrussell is the default and shows branch like: dir git:(main)
ZSH_THEME="robbyrussell"

# -----------------------------
# Plugins
# -----------------------------
# Built in oh my zsh plugins:
#   git                     git shortcuts and better git status in prompt
#   z                       jump around to frequently used directories
#   fzf                     fuzzy finder integration (if fzf is installed)
#   colored-man-pages       colorful man pages
#   history-substring-search search history by typing part of a command
#   web-search              quick web searches from the shell
#
# External plugins (need to be installed under $ZSH/custom/plugins):
#   zsh-autosuggestions     shows ghost text suggestions from history
#   zsh-syntax-highlighting colors commands while you type
plugins=(
  git
  z
  fzf
  colored-man-pages
  history-substring-search
  web-search
  zsh-autosuggestions
  zsh-syntax-highlighting
)

source "$ZSH/oh-my-zsh.sh"

# -----------------------------
# Optional plugin loading guards
# (these avoid errors if you have not cloned the extra plugins yet)
# -----------------------------
if [ -f "${ZSH_CUSTOM:-$ZSH/custom}/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh" ]; then
  source "${ZSH_CUSTOM:-$ZSH/custom}/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh"
fi

if [ -f "${ZSH_CUSTOM:-$ZSH/custom}/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" ]; then
  source "${ZSH_CUSTOM:-$ZSH/custom}/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"
fi

# -----------------------------
# Prompt and git info helpers
# -----------------------------
# Show git status info in the prompt a bit faster
export DISABLE_UNTRACKED_FILES_DIRTY="true"

# Shorten the path in the prompt a bit
export PROMPT_DIRTRIM=3

# -----------------------------
# Quality of life options
# -----------------------------
# Case insensitive completion
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'

# Better history
HISTSIZE=5000
SAVEHIST=5000
HISTFILE="$HOME/.zsh_history"
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_SPACE
setopt SHARE_HISTORY

# Enable vim keybindings in shell (optional, comment out if you hate vim)
bindkey -v

# Nice ls defaults
alias ll='ls -lah'
alias la='ls -A'
alias l='ls -CF'

# Show current git branch in the title bar
precmd() {
  title="$PWD"
  if git rev_parse --is-inside-work-tree >/dev/null 2>&1; then
    branch=$(git symbolic-ref --short HEAD 2>/dev/null || git rev_parse --short HEAD 2>/dev/null)
    title="$title [$branch]"
  fi
  echo -ne "\033]0;$title\007"
}
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

