# Web3 Starter Kit

A react, typescript boilerplate for Web3 applications.

### Features

- ⚡ [Next.js](https://nextjs.org) for Static Site Generator
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org)
- 🗂 [Zustand](https://github.com/pmndrs/zustand) for state management
- 📒 Web3 accounts with [web3-react](https://github.com/NoahZinsmeister/web3-react)

### Requirements

- [Node.js 14+](https://nextjs.org)
- [Yarn](https://yarnpkg.com/)

### Usage

To install packages:

```shell
yarn
```

Run local development mode with:

```shell
yarn dev
```

### Configuration

You can easily configure the boilerplate by changing the followin files:

- `config/wallets.ts`: Specifies which wallets are supported

- `config/menu.ts`: Socials and resources for your project

- `constants/blockchain.ts`: Specifies which chains are supported

- `constants/contracts.ts`: Contracts users are interacting with

- `constants/tokens.ts`: ERC20 tokens interacting with contracts

- `store/`: Store, types, hooks and updaters for your state
