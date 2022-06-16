import React from 'react'
import 'styles/index.css'
import '@reach/dialog/styles.css'

import { Layout } from 'components/base/Layout'

import { ThemeProvider } from 'styled-components'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Web3Provider from 'components/web3/Provider'

import Web3Updater from 'connectors/updater'
import TokenDataUpdater from 'store/tokendata/updater'

function Updaters() {
  return (
    <>
      <Web3Updater />
      <TokenDataUpdater />
    </>
  )
}

const theme = {
  main: 'green',
}

export default function MyApp(props: any) {
  const { Component, pageProps } = props
  const router = useRouter()

  return (
    <React.Fragment>
      <Head>
        <title>Web3 React App</title>
        <meta name="title" content="Web3 React App" />
        <meta name="description" content="React, TypeScript boilerplate for Web3" />
        <meta name="keywords" content="web3, ethereum" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ThemeProvider theme={theme}>
        <Web3Provider>
          <React.Fragment>
            <Updaters />
            <Layout>
              <motion.div
                key={router.route}
                initial="pageInitial"
                animate="pageAnimate"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                  },
                }}
              >
                <Component {...pageProps} />
              </motion.div>
            </Layout>
          </React.Fragment>
        </Web3Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}
