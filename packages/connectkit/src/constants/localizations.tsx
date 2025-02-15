import React from 'react';
import Logos from '../assets/logos';

export const localize = (text: string, replacements?: any[string]) => {
  let parsedText: string = text;
  if (replacements) {
    Object.keys(replacements).forEach((key) => {
      parsedText = parsedText.replaceAll(
        `{{ ${key} }}`,
        replacements[key as keyof typeof replacements]
      );
    });
  }
  return replaceMarkdown(parsedText);
};

const wrapTags = (text: string) => {
  const textArray = text.split(/(\*\*[^\*]*\*\*)/g);
  let result = textArray.map((str, i) => {
    if (/(\*\*.*\*\*)/g.test(str)) {
      return <strong key={i}>{str.replaceAll('**', '')}</strong>;
    }
    return `${str}`;
  });

  return result.map((r) => {
    if (typeof r === 'string') {
      return r.split(/(\[WALLETCONNECTLOGO\])/g).map((s, i) => {
        if (s === '[WALLETCONNECTLOGO]') {
          return (
            <span className="ck-tt-logo" key={i}>
              <Logos.WalletConnect />
            </span>
          );
        }
        return s;
      });
    }
    return r;
  });
};
export const replaceMarkdown = (markdownText: string) => {
  let text: any = markdownText;
  text = text.split('\n');
  text = text.map((t: string, i: number) => {
    return (
      <React.Fragment key={i}>
        {wrapTags(t)}
        {i < text.length && <br />}
      </React.Fragment>
    );
  });
  return text;
};

export const keys = {
  connectorName: '{{ CONNECTORNAME }}',
  connectorShortName: '{{ CONNECTORSHORTNAME }}',
  suggestedExtensionBrowser: '{{ SUGGESTEDEXTENSIONBROWSER }}',
  walletConnectLogo: '{{ WALLETCONNECTLOGO }}',
};

/**
 * Only markdown currently supported is **bold** highlighting.
 * If more is needed I suggest using a library
 */
export default {
  en: {
    onboardingScreen: {
      heading: `Get a Wallet`,
      h1: `Start Exploring Web3`,
      p: `Your wallet is the gateway to all things Ethereum, the magical technology that makes it possible to explore web3.`,
      ctaText: `Choose Your First Wallet`,
      ctaUrl: `https://ethereum.org/en/wallets/find-wallet/#main-content`,
    },
    aboutScreen: {
      heading: `About Wallets`,
      a_h1: `For your digital assets`,
      a_p: `Wallets let you send, receive, store, and interact with digital assets like NFTs and other Ethereum tokens.`,
      b_h1: `A better way to login`,
      b_p: `With modern apps, your wallet can be used as an easy way to login, instead of having to remember a password.`,
      c_h1: `Explore the world of web3`,
      c_p: `Your wallet is an essential utility that lets you explore and participate in the fast evolving world of web3.`,
      ctaText: `Learn More`,
      ctaUrl: `https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/`,
    },
    connectorsScreen: {
      heading: `Connect Wallet`,
      newcomer: `I don’t have a wallet`,
      h1: `What is a wallet?`,
      p: `Wallets are used to send, receive, and store digital assets. Connecting a wallet lets you interact with apps.`,
    },
    mobileConnectorsScreen: {
      heading: `Choose Wallet`,
    },
    scanScreen: {
      heading: `Scan with Phone`,
      tooltip: {
        walletConnect: `Open a [WALLETCONNECTLOGO] WalletConnect \nsupported wallet to scan`,
        default: `Open ${keys.connectorName} on \nyour mobile phone to scan`,
      },
    },
    downloadAppScreen: {
      heading: `Get ${keys.connectorName}`,
      iosAndroid: `Scan with your phone camera to download on iOS or Android.`,
      ios: `Scan with your phone camera to download on iOS.`,
      android: `Scan with your phone camera to download Android.`,
    },
    injectionScreen: {
      unavailable: {
        h1: `Unsupported Browser`,
        p: `To connect your ${keys.connectorShortName} wallet,\ninstall the extension on ${keys.suggestedExtensionBrowser}.`,
      },
      install: {
        h1: `Install ${keys.connectorName}`,
        p: `To connect your ${keys.connectorShortName} wallet,\ninstall the browser extension.`,
      },
      connecting: {
        h1: `Requesting Connection`,
        p: `Open the ${keys.connectorShortName} browser \nextension to connect your wallet.`,
        injected_h1: `Requesting Connection`,
        injected_p: `Accept the request through your wallet to connect to this app.`,
      },
      expiring: {
        requestWillExpiryIn: `This request will expire in`,
      },
      connected: {
        h1: `Already Connected`,
        p: `It is now okay to close this popup`,
      },
      rejected: {
        h1: `Request Cancelled`,
        p: `You cancelled the request.\nClick above to try again.`,
      },
      failed: {
        h1: `Connection Failed`,
        p: `Sorry, something went wrong.\nPlease try connecting again.`,
      },
      notconnected: {
        h1: `Login to ${keys.connectorName}`,
        p: `To continue, please login to your ${keys.connectorName} extension.`,
      },
    },
    profileScreen: {
      heading: 'Connected',
      unsupported: `Your wallet does not support switching networks from this app.\nTry switching networks from within your wallet instead.`,
    },
    switchNetworkScreen: {
      heading: 'Switch Networks',
    },
  },
};
