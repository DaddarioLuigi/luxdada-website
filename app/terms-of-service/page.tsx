"use client"

import { useLanguage } from "@/lib/language-context"

export default function TermsOfServicePage() {
  const { language } = useLanguage()
  const isIt = language === 'it'

  return (
    <div className="pt-24">
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {isIt ? 'Termini di Servizio' : 'Terms of Service'}
          </h1>
          <p className="text-gray-600 mb-8">
            {isIt
              ? 'Questi Termini regolano l’accesso e l’utilizzo del sito e dei servizi Luxdada. Usando il sito accetti integralmente i presenti Termini.'
              : 'These Terms govern access to and use of Luxdada’s website and services. By using the site, you fully agree to these Terms.'}
          </p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Idoneità e Accettazione' : 'Eligibility and Acceptance'}</h2>
              <p>
                {isIt
                  ? 'Dichiari di avere l’età richiesta dalla legge e la capacità di stipulare contratti vincolanti. L’uso continuato del sito implica l’accettazione dei Termini aggiornati.'
                  : 'You represent you are of legal age and have capacity to enter into binding agreements. Continued use of the site constitutes acceptance of updated Terms.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Servizi e Contenuti' : 'Services and Content'}</h2>
              <p>
                {isIt
                  ? 'I contenuti del sito sono forniti a scopo informativo. Possiamo modificare, sospendere o interrompere il sito o parti di esso senza preavviso.'
                  : 'Site content is provided for informational purposes. We may modify, suspend, or discontinue the site or portions thereof without notice.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Account e Responsabilità' : 'Accounts and Responsibility'}</h2>
              <p>
                {isIt
                  ? 'Se crei un account, sei responsabile di mantenerne la riservatezza e dell’uso che ne viene fatto. Segnalaci immediatamente ogni uso non autorizzato.'
                  : 'If you create an account, you are responsible for maintaining its confidentiality and all activities under it. Notify us promptly of unauthorized use.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Proprietà Intellettuale' : 'Intellectual Property'}</h2>
              <p>
                {isIt
                  ? 'Tutti i contenuti, marchi e loghi sono di proprietà di Luxdada o dei rispettivi titolari e sono protetti dalle leggi applicabili. È vietato l’uso non autorizzato.'
                  : 'All content, trademarks, and logos are owned by Luxdada or their respective owners and protected by applicable laws. Unauthorized use is prohibited.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Uso Consentito' : 'Permitted Use'}</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>{isIt ? 'Non violare leggi, diritti o politiche applicabili.' : 'Do not violate applicable laws, rights, or policies.'}</li>
                <li>{isIt ? 'Non introdurre malware, tentare accessi non autorizzati o attività dannose.' : 'Do not introduce malware, attempt unauthorized access, or engage in harmful activity.'}</li>
                <li>{isIt ? 'Non usare il sito per finalità fraudolente o illecite.' : 'Do not use the site for fraudulent or unlawful purposes.'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Esclusioni di Garanzia' : 'Disclaimers'}</h2>
              <p>
                {isIt
                  ? 'Il sito è fornito “così com’è”. Nella misura consentita dalla legge, escludiamo garanzie espresse o implicite, incluse commerciabilità, idoneità a uno scopo particolare e non violazione.'
                  : 'The site is provided “as is.” To the extent permitted by law, we disclaim all express or implied warranties, including merchantability, fitness for a particular purpose, and non‑infringement.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Limitazione di Responsabilità' : 'Limitation of Liability'}</h2>
              <p>
                {isIt
                  ? 'Nella misura consentita, Luxdada non sarà responsabile per danni indiretti, incidentali, consequenziali, perdita di profitti o dati derivanti dall’uso del sito.'
                  : 'To the extent permitted, Luxdada shall not be liable for indirect, incidental, consequential damages, or loss of profits or data arising from use of the site.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Indennizzo' : 'Indemnification'}</h2>
              <p>
                {isIt
                  ? 'Accetti di tenere indenne Luxdada da rivendicazioni derivanti dal tuo uso del sito o dalla violazione dei Termini.'
                  : 'You agree to indemnify Luxdada from claims arising out of your use of the site or breach of these Terms.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Cessazione' : 'Termination'}</h2>
              <p>
                {isIt
                  ? 'Possiamo sospendere o terminare l’accesso al sito in qualsiasi momento per qualsiasi motivo, inclusa la violazione dei Termini.'
                  : 'We may suspend or terminate access to the site at any time for any reason, including breach of the Terms.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Legge Applicabile e Foro' : 'Governing Law and Jurisdiction'}</h2>
              <p>
                {isIt
                  ? 'Questi Termini sono regolati dalla legge italiana. Foro esclusivo competente: Bari, Italia.'
                  : 'These Terms are governed by the laws of Italy. Exclusive jurisdiction: Bari, Italy.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Modifiche' : 'Changes'}</h2>
              <p>
                {isIt
                  ? 'Potremmo aggiornare i Termini periodicamente. Le modifiche avranno effetto dalla pubblicazione sul sito.'
                  : 'We may update these Terms from time to time. Changes take effect upon posting on the site.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Contatti' : 'Contact'}</h2>
              <p>
                {isIt ? 'Per domande, scrivi a info@luxdada.it.' : 'For questions, email info@luxdada.it.'}
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}


