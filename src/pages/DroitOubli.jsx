import LegalLayout from '../components/LegalLayout'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function DroitOubli() {
  const [copied, setCopied] = useState(false)
  const emailSubject = encodeURIComponent("Demande de suppression de mes données : My New Body")
  const emailBody = encodeURIComponent(
    `Bonjour,\n\nConformément à l'article 36 de la Loi n°2013-450 de Côte d'Ivoire relative à la protection des données personnelles, je souhaite exercer mon droit à l'effacement (droit à l'oubli) sur l'ensemble des données que My New Body détient me concernant.\n\n• Email utilisé lors de l'inscription : \n• Date approximative d'inscription : \n• Motif (facultatif) : \n\nJe demande la suppression totale et irréversible de :\n☐ Mon compte et mes informations d'identification\n☐ L'ensemble de mes check-ins quotidiens\n☐ L'ensemble de mes programmes générés\n☐ Toute donnée de candidature à la phase alpha\n\nJe comprends que cette action est irréversible.\n\nMerci de bien vouloir me confirmer la suppression par retour d'email.\n\nCordialement,`
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('contact@mexiale.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (e) {
      /* no-op */
    }
  }

  return (
    <LegalLayout
      title="Droit à l'oubli"
      subtitle="Vous pouvez à tout moment demander la suppression complète et irréversible de l'ensemble de vos données personnelles."
      lastUpdate="9 octobre 2026"
    >
      <div className="callout">
        <p>
          <strong>🗑️ En résumé :</strong> En envoyant un simple email, nous supprimons <strong>sous 7 jours ouvrés maximum</strong> l'intégralité de vos données : compte, check-ins, programmes générés, candidature alpha. Aucune copie n'est conservée.
        </p>
      </div>

      <h2>Vos droits garantis</h2>
      <p>
        Conformément à l'article 36 de la <strong>Loi n°2013-450 de Côte d'Ivoire</strong> relative à la protection des données à caractère personnel, vous disposez d'un droit à l'effacement de vos données personnelles. Ce droit est <strong>absolu, gratuit et sans justification requise</strong>.
      </p>

      <h2>Ce qui est supprimé</h2>
      <p>Lorsque vous exercez votre droit à l'oubli, nous supprimons de manière irréversible :</p>
      <ul>
        <li>Votre compte utilisateur et vos informations d'identification (email)</li>
        <li>L'intégralité de vos <strong>check-ins quotidiens</strong> (énergie, sommeil, humeur, stress, douleurs, nutrition, notes)</li>
        <li>L'intégralité des <strong>programmes générés</strong> par le coach IA</li>
        <li>Votre candidature à la phase alpha et les motivations associées</li>
        <li>L'historique de connexion et les logs techniques associés</li>
      </ul>

      <h2>Comment faire la demande</h2>
      <p>
        Envoyez simplement un email à <a href="mailto:contact@mexiale.com">contact@mexiale.com</a> depuis l'adresse associée à votre compte avec pour objet <strong>« Demande de suppression de mes données »</strong>.
      </p>

      <div className="my-8 glass-card rounded-2xl p-6 border border-accent/20 not-prose">
        <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-4">Modèle d'email prêt à envoyer</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:contact@mexiale.com?subject=${emailSubject}&body=${emailBody}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent-dark hover:bg-accent transition-colors text-white font-bold text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Ouvrir dans mon client mail
          </a>
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/15 hover:border-accent/40 bg-white/5 hover:bg-accent/10 transition-all text-white font-medium text-sm"
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                <span className="text-accent-physical">Copié</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copier l'adresse email
              </>
            )}
          </button>
        </div>
      </div>

      <h2>Délai de traitement</h2>
      <p>
        Nous nous engageons à traiter votre demande dans un <strong>délai maximum de 7 jours ouvrés</strong>. Dans la majorité des cas, la suppression est effectuée sous 48 heures. Vous recevrez un email de confirmation une fois la suppression effective.
      </p>

      <h2>Vérification de l'identité</h2>
      <p>
        Pour sécuriser le processus et éviter toute suppression frauduleuse, la demande doit impérativement être envoyée depuis <strong>l'adresse email associée à votre compte</strong>. Si vous n'avez plus accès à cette adresse, nous vous demanderons une pièce d'identité (floutée des informations non nécessaires) pour vérifier votre demande.
      </p>

      <h2>Ce qui peut être conservé après suppression</h2>
      <p>
        Pour des raisons strictement légales et comptables, nous pouvons être amenés à conserver certaines informations <strong>anonymisées</strong> (statistiques agrégées, sans possibilité de ré-identification). Ces informations ne permettent plus de vous identifier d'aucune manière.
      </p>

      <h2>Caractère irréversible</h2>
      <div className="callout">
        <p>
          <strong>⚠️ Important :</strong> La suppression est <strong>définitive et irréversible</strong>. Nous ne conservons aucune copie de sauvegarde récupérable. Si vous souhaitez par la suite réutiliser My New Body, vous devrez créer un nouveau compte et éventuellement candidater à nouveau à une phase de test.
        </p>
      </div>

      <h2>Autres droits</h2>
      <p>
        Si vous ne souhaitez pas tout supprimer mais plutôt accéder, modifier ou récupérer vos données, consultez notre <Link to="/politique-confidentialite">politique de confidentialité</Link> (section « Vos droits »).
      </p>

      <h2>Besoin d'aide ?</h2>
      <p>
        Si vous avez des questions avant d'exercer ce droit, ou si vous rencontrez un problème dans le processus, écrivez-nous à <a href="mailto:contact@mexiale.com">contact@mexiale.com</a>, nous vous répondrons sous 48h.
      </p>
    </LegalLayout>
  )
}
