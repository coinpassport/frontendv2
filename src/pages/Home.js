import { ConnectButton } from '@rainbow-me/rainbowkit';
import { __ } from '../i18n.js';

import ethLogo from '../eth-diamond-rainbow.png';

export default function Home() {
  return (<>
    <div className="header-bg">
    <header>
      <nav>
        <h1>CoinPassport</h1>
      </nav>
      <ConnectButton />
    </header>
    <section id="home-banner">
      <div className="inner">
        <article className="">
          <p>{__`Proof of Personhood`}<br />{__`from your government ID`}</p>
        </article>
        <div id="passport-wrapper">
          <div id="passport">
            <span className="text2">{__`Passport`}</span>
            <img src={ethLogo} alt="Ethereum Diamond Rainbow Logo" />
            <span className="text3">Ethereum</span>
            <div className="chip">&nbsp;</div>
          </div>
        </div>
      </div>
    </section>
    </div>
    <section>
      <article className="page">
        <h2>{__`Verify once, verified anywhere`}</h2>
        <p className="intro lead">{__`Prove you're a unique human by verifying your passport and publishing a hash of your passport number and country of citizenship to your Ethereum, Polygon, or Avalanche wallet.`}</p>
        <p className="intro">{__`To begin, connect your browser wallet.`}</p>
        <ConnectButton />
      </article>
    </section>
    <section className="accent-banner3">
    <h2>{__`Comparison of Proof of Personhood methods`}</h2>
    </section>
    <ul id="personhood-types">
      <li className="active">
        <h3>{__`Coinpassport: Digital Government IDs`}</h3>
        <dl>
          <div>
          <dt>{__`Pros`}</dt>
          <dd>{__`Simple and easy to scale`}</dd>
          </div>
          <div>
          <dt>{__`Cons`}</dt>
          <dd>{__`Vulnerable to rogue nation states duplicating or censoring identities`}</dd>
          </div>
        </dl>
      </li>
      <li>
        <h3>{__`Idena: Reverse Turing Tests`}</h3>
        <dl>
          <div>
          <dt>{__`Pros`}</dt>
          <dd>{__`Decentralized and still fairly simple`}</dd>
          </div>
          <div>
          <dt>{__`Cons`}</dt>
          <dd>{__`Requires all users to meet at the same time and is vulnerbable to AI`}</dd>
          </div>
        </dl>
      </li>
      <li>
        <h3>{__`BrightID: Social Graph Analysis`}</h3>
        <dl>
          <div>
          <dt>{__`Pros`}</dt>
          <dd>{__`Decentralized and easy to scale`}</dd>
          </div>
          <div>
          <dt>{__`Cons`}</dt>
          <dd>{__`Very complex and vulnerable to advances in AI`}</dd>
          </div>
        </dl>
      </li>
      <li>
        <h3>{__`Proof of Humanity`}</h3>
        <dl>
          <div>
          <dt>{__`Pros`}</dt>
          <dd>{__`Decentralized, AI-resistant, and economically incentivized`}</dd>
          </div>
          <div>
          <dt>{__`Cons`}</dt>
          <dd>{__`More complex and large deposit amount`}</dd>
          </div>
        </dl>
      </li>
    </ul>
    <section className="accent-banner2">
      <article className="page">
        <h2>{__`Why this Matters`}</h2>
        <p>{__`Most blockchain voting systems suffer from the fact that anybody can make multiple accounts. Proof of Personhood seeks to rewrite this rule so that wallet size no longer determines vote weight.`}</p>
        <p>{__`Coinpassport utilizes your government-issued passport to ensure each person can only open one account.`}</p>
        <p>{__`The full possibilities of democratic governance can now be explored on applications built using Coinpassport.`}</p>
      </article>
    </section>
    <section className="accent-banner">
      <article className="page">
        <h2>{__`How it Works`}</h2>
        <ol id="how-it-works">
          <li>{__`Pay 3 USDC fee to cover verification service`}</li>
          <li>{__`Verify by taking a picture of your passport and your face with your mobile phone`}</li>
          <li>{__`Publish your verification result to any supported blockchain`}</li>
        </ol>
        <p>{__`Additionally, you may optionally publish your age as over 18 or 21, as well as your country of citizenship.`}</p>
      </article>
    </section>
    <section className="">
      <article className="page">
        <h2>{__`Why Trust Coinpassport`}</h2>
        <p>{__`Your individual details will never be revealed. Your verification result only identifies your wallet as belonging to a unique human.`}</p>
        <p>{__`After verifying, you may (and should) redact your personal information from our servers. If you wish, you may also revoke your verification status.`}</p>
      </article>
    </section>
    <section className="white-banner">
      <h2>{__`Supported Countries`}</h2>
      <article className="page">
        <details className="countries">
        <summary>
          <img src="/world.svg" alt={__`Supported Countries`} />
          {__`Click for complete list`}
        </summary>
        <ul className="countries">
          <li>{__`Albania`}</li>
          <li>{__`Algeria`}</li>
          <li>{__`Argentina`}</li>
          <li>{__`Armenia`}</li>
          <li>{__`Australia`}</li>
          <li>{__`Austria`}</li>
          <li>{__`Azerbaijan`}</li>
          <li>{__`Bahamas`}</li>
          <li>{__`Bahrain`}</li>
          <li>{__`Bangladesh`}</li>
          <li>{__`Belarus`}</li>
          <li>{__`Belgium`}</li>
          <li>{__`Benin`}</li>
          <li>{__`Bolivia`}</li>
          <li>{__`Brazil`}</li>
          <li>{__`Bulgaria`}</li>
          <li>{__`Cameroon`}</li>
          <li>{__`Canada`}</li>
          <li>{__`Chile`}</li>
          <li>{__`China`}</li>
          <li>{__`Colombia`}</li>
          <li>{__`Costa Rica`}</li>
          <li>{__`Côte d’Ivoire`}</li>
          <li>{__`Croatia`}</li>
          <li>{__`Cyprus`}</li>
          <li>{__`Czech Republic`}</li>
          <li>{__`Denmark`}</li>
          <li>{__`Dominican Republic`}</li>
          <li>{__`Ecuador`}</li>
          <li>{__`Egypt`}</li>
          <li>{__`El Salvador`}</li>
          <li>{__`Estonia`}</li>
          <li>{__`Finland`}</li>
          <li>{__`France`}</li>
          <li>{__`Georgia`}</li>
          <li>{__`Germany`}</li>
          <li>{__`Ghana`}</li>
          <li>{__`Greece`}</li>
          <li>{__`Guatemala`}</li>
          <li>{__`Haiti`}</li>
          <li>{__`Honduras`}</li>
          <li>{__`Hong Kong`}</li>
          <li>{__`Hungary`}</li>
          <li>{__`India`}</li>
          <li>{__`Indonesia`}</li>
          <li>{__`Iraq`}</li>
          <li>{__`Ireland`}</li>
          <li>{__`Israel`}</li>
          <li>{__`Italy`}</li>
          <li>{__`Jamaica`}</li>
          <li>{__`Japan`}</li>
          <li>{__`Jersey`}</li>
          <li>{__`Jordan`}</li>
          <li>{__`Kazakhstan`}</li>
          <li>{__`Kenya`}</li>
          <li>{__`Kuwait`}</li>
          <li>{__`Latvia`}</li>
          <li>{__`Lebanon`}</li>
          <li>{__`Liechtenstein`}</li>
          <li>{__`Lithuania`}</li>
          <li>{__`Luxembourg`}</li>
          <li>{__`Malaysia`}</li>
          <li>{__`Malta`}</li>
          <li>{__`Mauritius`}</li>
          <li>{__`Mexico`}</li>
          <li>{__`Moldova`}</li>
          <li>{__`Mongolia`}</li>
          <li>{__`Morocco`}</li>
          <li>{__`Myanmar (Burma)`}</li>
          <li>{__`Nepal`}</li>
          <li>{__`Netherlands`}</li>
          <li>{__`New Zealand`}</li>
          <li>{__`Nigeria`}</li>
          <li>{__`North Macedonia`}</li>
          <li>{__`Norway`}</li>
          <li>{__`Pakistan`}</li>
          <li>{__`Palestinian Territories`}</li>
          <li>{__`Panama`}</li>
          <li>{__`Paraguay`}</li>
          <li>{__`Peru`}</li>
          <li>{__`Philippines`}</li>
          <li>{__`Poland`}</li>
          <li>{__`Portugal`}</li>
          <li>{__`Puerto Rico`}</li>
          <li>{__`Romania`}</li>
          <li>{__`Russia`}</li>
          <li>{__`Saudi Arabia`}</li>
          <li>{__`Serbia`}</li>
          <li>{__`Singapore`}</li>
          <li>{__`Slovakia`}</li>
          <li>{__`Slovenia`}</li>
          <li>{__`South Africa`}</li>
          <li>{__`South Korea`}</li>
          <li>{__`Spain`}</li>
          <li>{__`Sri Lanka`}</li>
          <li>{__`Sweden`}</li>
          <li>{__`Switzerland`}</li>
          <li>{__`Taiwan`}</li>
          <li>{__`Thailand`}</li>
          <li>{__`Tunisia`}</li>
          <li>{__`Turkey`}</li>
          <li>{__`Uganda`}</li>
          <li>{__`Ukraine`}</li>
          <li>{__`United Arab Emirates`}</li>
          <li>{__`United Kingdom`}</li>
          <li>{__`United States`}</li>
          <li>{__`Uruguay`}</li>
          <li>{__`Uzbekistan`}</li>
          <li>{__`Venezuela`}</li>
          <li>{__`Vietnam`}</li>
        </ul>
        </details>
      </article>
    </section>
  </>);
}
