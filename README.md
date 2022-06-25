# grant.codes dotfiles

My personal collection of dotfiles managed using [chezmoi](https://www.chezmoi.io).

## Installing

To get up and running with these dotfiles, first install chezmoi following [the instructions in their documentation](https://www.chezmoi.io/install/).

Then run `chezmoi init https://github.com/grantcodes/dotfiles.git` to pull and apply these dotfiles.

## What's in the Box

- [BitWarden](https://bitwarden.com) is used for secret management. The BitWarden cli should be automatically installed when initializing these dotfiles, but it may not log in correctly.
- Uses [ZSH](https://www.zsh.org/) with [Oh My ZSH](https://github.com/ohmyzsh/ohmyzsh) as shell & plugins.
(Though I am a big fish shell fan, but I'm back on ZSH to not have to deal with so many compatibility issues)
- [Starship](https://starship.rs) is used as the shell prompt.
- [NodeJS](https://nodejs.org) for dev work, along with a few helpful global packages
- [NVM](https://github.com/nvm-sh/nvm) for managing node versions
- [Docker](https://www.docker.com) for dev work
- A base git config
- SSH keys & config
