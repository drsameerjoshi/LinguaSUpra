import { useTranslation } from "react-i18next";

import bnpParibas from "@/assets/clients-webp/01_BNP_Paribas.webp";
import bnpCardif from "@/assets/clients-webp/02_BNP_Cardif.webp";
import postLux from "@/assets/clients-webp/03_Post_Luxembourg.webp";
import bcl from "@/assets/clients-webp/04_Banque_Centrale_du_Luxembourg.webp";
import bil from "@/assets/clients-webp/05_BIL_Banque_Internationale_Luxembourg.webp";
import bdl from "@/assets/clients-webp/06_Banque_de_Luxembourg.webp";
import edenred from "@/assets/clients-webp/07_Edenred.webp";
import apleona from "@/assets/clients-webp/08_Apleona.webp";
import adecco from "@/assets/clients-webp/09_Adecco.webp";
import lih from "@/assets/clients-webp/10_Luxembourg_Institute_of_Health.webp";
import tarkett from "@/assets/clients-webp/11_Tarkett.webp";
import chemolux from "@/assets/clients-webp/12_Chemolux.webp";
import axa from "@/assets/clients-webp/13_AXA.webp";
import bayer from "@/assets/clients-webp/14_Bayer.webp";
import lanxess from "@/assets/clients-webp/15_Lanxess.webp";
import grantThornton from "@/assets/clients-webp/16_Grant_Thornton.webp";
import jetfly from "@/assets/clients-webp/17_Jetfly_Aviation.webp";
import leaseplan from "@/assets/clients-webp/18_LeasePlan.webp";
import pictet from "@/assets/clients-webp/19_Pictet.webp";
import giorgetti from "@/assets/clients-webp/20_Felix_Giorgetti.webp";
import pluxee from "@/assets/clients-webp/21_Pluxee.webp";
import payment3c from "@/assets/clients-webp/22_3C_Payment.webp";
import pandoo from "@/assets/clients-webp/23_Pandoo_Administration.webp";
import exphar from "@/assets/clients-webp/25_Exphar_Laboratory.webp";
import bnode from "@/assets/clients-webp/26_bnode.webp";
import arendt from "@/assets/clients-webp/27_Arendt_and_Medernach.webp";
import lcs from "@/assets/clients-webp/Luxemburg_Corporate_Services.webp";

type Logo = { name: string; url: string };

const LOGOS: Logo[] = [
  { name: "BNP Paribas", url: bnpParibas },
  { name: "BNP Paribas Cardif", url: bnpCardif },
  { name: "POST Luxembourg", url: postLux },
  { name: "Banque Centrale du Luxembourg", url: bcl },
  { name: "Banque Internationale à Luxembourg", url: bil },
  { name: "Banque de Luxembourg", url: bdl },
  { name: "Edenred", url: edenred },
  { name: "Apleona", url: apleona },
  { name: "Adecco", url: adecco },
  { name: "Luxembourg Institute of Health", url: lih },
  { name: "Tarkett", url: tarkett },
  { name: "Chemolux", url: chemolux },
  { name: "AXA", url: axa },
  { name: "Bayer", url: bayer },
  { name: "Lanxess", url: lanxess },
  { name: "Grant Thornton", url: grantThornton },
  { name: "Jetfly Aviation", url: jetfly },
  { name: "LeasePlan", url: leaseplan },
  { name: "Pictet", url: pictet },
  { name: "Félix Giorgetti", url: giorgetti },
  { name: "Pluxee", url: pluxee },
  { name: "3C Payment", url: payment3c },
  { name: "Pandoo Administration", url: pandoo },
  { name: "Exphar Laboratory", url: exphar },
  { name: "bnode", url: bnode },
  { name: "Arendt & Medernach", url: arendt },
  { name: "Luxembourg Corporate Services", url: lcs },
];

const ROW_A = LOGOS.filter((_, i) => i % 2 === 0);
const ROW_B = LOGOS.filter((_, i) => i % 2 === 1);

function Row({ logos, reverse }: { logos: Logo[]; reverse?: boolean }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden">
      <div className={`marquee-track gap-3 pr-3 sm:gap-4 sm:pr-4${reverse ? " reverse" : ""}`}>
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-16 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-white px-6 sm:h-20 sm:px-8"
          >
            <img
              src={logo.url}
              alt={`${logo.name} logo`}
              loading="lazy"
              decoding="async"
              className="h-7 w-auto max-w-[140px] object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-9 sm:max-w-[170px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ClientLogos - dual marquee of organisations whose teams and leaders
 * Su has coached. Top row scrolls left, bottom row scrolls right.
 */
export function ClientLogos() {
  const { t } = useTranslation();

  return (
    <section className="overflow-hidden border-y border-border/60 bg-[color:var(--paper)] py-12 md:py-16">
      <div className="mx-auto mb-8 max-w-7xl px-5 text-center lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {t("clients.eyebrow", "Trusted by teams and leaders at")}
        </p>
      </div>
      <div className="mask-fade-x flex flex-col gap-3 sm:gap-4">
        <Row logos={ROW_A} />
        <Row logos={ROW_B} reverse />
      </div>
    </section>
  );
}
