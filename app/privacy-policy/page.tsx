"use client"

import { useLanguage } from "@/lib/language-context"

export default function PrivacyPolicyPage() {
  const { language } = useLanguage()
  const isIt = language === 'it'

  return (
    <div className="pt-24">
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {isIt ? 'Informativa sulla Privacy' : 'Privacy Policy'}
          </h1>
          <p className="text-gray-600 mb-8">
            {isIt
              ? 'Questa informativa descrive come Luxdada raccoglie, utilizza, conserva e protegge i dati personali in conformità al Regolamento (UE) 2016/679 (GDPR) e alla normativa applicabile.'
              : 'This policy describes how Luxdada collects, uses, stores, and protects personal data in accordance with the EU General Data Protection Regulation (GDPR) and applicable law.'}
          </p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Titolare del trattamento' : 'Data Controller'}</h2>
              <p>
                {isIt
                  ? 'Luxdada – Trav. 19A di Via Napoli, Bari, BA 70127 – Email: info@luxdada.it'
                  : 'Luxdada – Trav. 19A di Via Napoli, Bari, BA 70127 – Email: info@luxdada.it'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Categorie di dati raccolti' : 'Categories of Data Collected'}</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>{isIt ? 'Dati identificativi e di contatto (nome, email, telefono, azienda).' : 'Identification and contact details (name, email, phone, company).'}</li>
                <li>{isIt ? 'Dati forniti nel modulo contatti e comunicazioni.' : 'Data provided in contact forms and communications.'}</li>
                <li>{isIt ? 'Dati di utilizzo del sito e cookie tecnici/analitici.' : 'Website usage data and technical/analytics cookies.'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Finalità e basi giuridiche' : 'Purposes and Legal Bases'}</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>{isIt ? 'Rispondere a richieste e fornire assistenza (art. 6.1.b GDPR).' : 'Responding to inquiries and providing support (Art. 6.1.b GDPR).'}</li>
                <li>{isIt ? 'Marketing diretto previa base giuridica appropriata (consenso o legittimo interesse – art. 6.1.a/f).' : 'Direct marketing under appropriate legal basis (consent or legitimate interest – Art. 6.1.a/f).'}
                <li>{isIt ? 'Miglioramento dei servizi e sicurezza del sito (legittimo interesse – art. 6.1.f).' : 'Improving services and website security (legitimate interest – Art. 6.1.f).'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Conservazione dei dati' : 'Data Retention'}</h2>
              <p>
                {isIt
                  ? 'I dati sono conservati per il tempo necessario a soddisfare le finalità per cui sono stati raccolti e, ove applicabile, per gli obblighi legali (es. fino a 24 mesi per finalità di marketing o fino alla revoca del consenso).'
                  : 'Data are retained for as long as needed to fulfill the purposes collected and, where applicable, to comply with legal obligations (e.g., up to 24 months for marketing purposes or until consent is withdrawn).'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Condivisione e trasferimenti' : 'Sharing and Transfers'}</h2>
              <p>
                {isIt
                  ? 'I dati possono essere condivisi con fornitori di servizi (es. hosting, email, analytics) nominati responsabili del trattamento. Eventuali trasferimenti extra‑SEE avvengono con adeguate garanzie (es. SCC).'
                  : 'Data may be shared with service providers (e.g., hosting, email, analytics) appointed as processors. Any transfers outside the EEA occur with appropriate safeguards (e.g., SCCs).'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Diritti degli interessati' : 'Data Subject Rights'}</h2>
              <p className="mb-2">
                {isIt
                  ? 'Puoi esercitare i diritti previsti dagli artt. 15–22 GDPR (accesso, rettifica, cancellazione, limitazione, opposizione, portabilità) e revocare il consenso in qualsiasi momento.'
                  : 'You may exercise rights under GDPR Arts. 15–22 (access, rectification, erasure, restriction, objection, portability) and withdraw consent at any time.'}
              </p>
              <p>
                {isIt
                  ? 'Per richieste o reclami contatta info@luxdada.it. Hai inoltre diritto di proporre reclamo all’Autorità Garante.'
                  : 'For requests or complaints, contact info@luxdada.it. You also have the right to lodge a complaint with your Supervisory Authority.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Cookies</h2>
              <p>
                {isIt
                  ? 'Il sito utilizza cookie tecnici e, ove presenti, analitici/di profilazione nel rispetto della normativa. Le preferenze possono essere gestite tramite le impostazioni del browser o apposito banner.'
                  : 'This site uses technical cookies and, where applicable, analytics/profiling cookies in compliance with applicable law. Preferences can be managed via browser settings or a consent banner.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Sicurezza' : 'Security'}</h2>
              <p>
                {isIt
                  ? 'Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati, perdita o divulgazione.'
                  : 'We implement appropriate technical and organizational measures to protect personal data against unauthorized access, loss, or disclosure.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Aggiornamenti' : 'Updates'}</h2>
              <p>
                {isIt
                  ? 'Potremmo aggiornare periodicamente questa informativa. Le modifiche saranno pubblicate su questa pagina con data di aggiornamento.'
                  : 'We may update this policy periodically. Updates will be published on this page with an effective date.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{isIt ? 'Contatti' : 'Contact'}</h2>
              <p>
                {isIt
                  ? 'Per qualsiasi domanda, scrivi a info@luxdada.it.'
                  : 'For any questions, email info@luxdada.it.'}
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}


