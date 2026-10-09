import LegalLayout from '../components/LegalLayout'
import { Link } from 'react-router-dom'

export default function PolitiqueConfidentialite() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      subtitle="Comment My New Body collecte, utilise et protège vos données personnelles, en toute transparence."
      lastUpdate="9 octobre 2026"
    >
      <div className="callout">
        <p>
          <strong>🛡️ Notre engagement :</strong> Nous ne <strong>vendons jamais</strong> vos données, nous ne les <strong>partageons jamais</strong> à des fins publicitaires, et nous appliquons le principe de <strong>Privacy by Design</strong> à toutes les étapes de la conception du produit.
        </p>
      </div>

      <h2>1. Responsable de traitement</h2>
      <p>
        Le responsable du traitement de vos données personnelles est :
      </p>
      <ul>
        <li><strong><a href="https://mexwebsolutions.com" target="_blank" rel="noopener noreferrer">Mexiale</a></strong></li>
        <li>Deux-Plateaux, Abidjan, Côte d'Ivoire</li>
        <li>Contact : <a href="mailto:contact@mexwebsolutions.com">contact@mexwebsolutions.com</a></li>
      </ul>
      <p>
        Un <strong>Correspondant à la Protection des Données (CPD)</strong> sera nommé avant le lancement commercial, conformément à l'article 20 de la Loi n°2013-450 de Côte d'Ivoire.
      </p>

      <h2>2. Données que nous collectons</h2>

      <h3>a. Lors de votre candidature à la phase alpha</h3>
      <ul>
        <li>Prénom et nom</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone (optionnel, pour accompagnement WhatsApp)</li>
        <li>Vos motivations et objectifs bien-être</li>
      </ul>

      <h3>b. Lors de votre connexion</h3>
      <ul>
        <li>Adresse email (authentification sans mot de passe par magic link)</li>
        <li>Jeton de session chiffré stocké temporairement dans votre navigateur</li>
      </ul>

      <h3>c. Lors de votre check-in quotidien (données de santé sensibles)</h3>
      <ul>
        <li>Niveau d'énergie, qualité du sommeil, humeur, stress, douleurs ressenties</li>
        <li>Informations nutritionnelles (ce que vous avez mangé, hydratation)</li>
        <li>Notes personnelles libres</li>
      </ul>

      <h3>d. Données techniques</h3>
      <ul>
        <li>Horodatage de connexion et des check-ins</li>
        <li>Type de navigateur et système d'exploitation (pour la compatibilité technique)</li>
      </ul>

      <div className="callout">
        <p>
          <strong>🪪 Pseudonymisation :</strong> Votre identité (nom, email) est strictement <strong>séparée de vos données de santé</strong> dans notre base de données. Elles sont stockées dans deux tables distinctes et reliées uniquement par un identifiant interne non signifiant.
        </p>
      </div>

      <h2>3. Finalités du traitement</h2>
      <p>Vos données sont utilisées exclusivement pour :</p>
      <ul>
        <li><strong>Générer votre programme quotidien personnalisé</strong> via notre coach IA (Physique, Nutrition, Mental)</li>
        <li><strong>Vous authentifier</strong> à l'espace testeur de manière sécurisée</li>
        <li><strong>Vous accompagner</strong> durant la phase alpha de 7 jours (support personnalisé)</li>
        <li><strong>Améliorer la pertinence</strong> des recommandations de l'IA (analyses agrégées, jamais individuelles)</li>
        <li><strong>Déclencher les alertes de sécurité</strong> en cas de signaux préoccupants (orientation vers le SAMU 185)</li>
      </ul>

      <h2>4. Base légale du traitement</h2>
      <p>
        Le traitement de vos données repose sur votre <strong>consentement libre, explicite et éclairé</strong>, recueilli au moment de votre candidature à la phase alpha. Vous pouvez retirer ce consentement à tout moment (voir section 8).
      </p>

      <h2>5. Durée de conservation</h2>
      <ul>
        <li><strong>Données de candidature :</strong> 12 mois après la fin de la phase alpha, puis anonymisation ou suppression.</li>
        <li><strong>Données de check-in et programmes :</strong> conservées pendant toute la durée de votre participation à l'alpha, puis supprimées dans un délai maximum de 30 jours après la fin de l'alpha, sauf consentement explicite pour prolongation.</li>
        <li><strong>Logs techniques :</strong> 90 jours maximum pour des raisons de sécurité.</li>
      </ul>

      <h2>6. Destinataires et sous-traitants</h2>
      <p>Vos données sont accessibles exclusivement par :</p>
      <ul>
        <li><strong><a href="https://mexwebsolutions.com" target="_blank" rel="noopener noreferrer">Mexiale</a></strong>, seule entité habilitée à consulter les données nominatives.</li>
        <li><strong>Supabase Inc.</strong> (hébergement de la base de données) : serveurs situés en France (Paris, région eu-west-3).</li>
        <li><strong>Anthropic PBC</strong> (API Claude) : les données de check-in sont envoyées à l'API Claude pour générer votre programme. Anthropic s'engage contractuellement à ne pas entraîner ses modèles sur les données API soumises par les développeurs.</li>
        <li><strong>Hostinger International Ltd.</strong> (hébergement du site vitrine) : n'a jamais accès à vos données de santé.</li>
      </ul>
      <p>
        <strong>Aucune donnée n'est transmise à des annonceurs, data brokers ou tiers commerciaux.</strong>
      </p>

      <h2>7. Sécurité</h2>
      <ul>
        <li>Chiffrement en transit via <strong>HTTPS / TLS 1.3</strong> sur l'ensemble du Site</li>
        <li>Chiffrement au repos de la base de données (AES-256)</li>
        <li>Authentification sans mot de passe par <strong>magic link</strong> à usage unique (élimine le risque de credential stuffing)</li>
        <li>Politiques de sécurité au niveau ligne (<strong>Row Level Security</strong>) : vous ne pouvez accéder qu'à vos propres données</li>
        <li>Secrets d'API jamais exposés côté client</li>
      </ul>

      <h2>8. Vos droits</h2>
      <p>
        Conformément à la Loi n°2013-450 de Côte d'Ivoire, vous disposez des droits suivants sur vos données personnelles :
      </p>
      <ul>
        <li><strong>Droit d'accès</strong> : obtenir une copie de l'ensemble des données que nous détenons sur vous</li>
        <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
        <li><strong>Droit à l'effacement (« droit à l'oubli »)</strong> : suppression totale et irréversible de vos données (voir la page <Link to="/droit-oubli">Droit à l'oubli</Link>)</li>
        <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et lisible (JSON)</li>
        <li><strong>Droit d'opposition</strong> : vous opposer à certains traitements</li>
        <li><strong>Droit de retrait du consentement</strong> : à tout moment, sans justification</li>
      </ul>
      <p>
        Pour exercer ces droits, écrivez à <a href="mailto:contact@mexwebsolutions.com">contact@mexwebsolutions.com</a>. Nous nous engageons à répondre dans un délai maximum de <strong>30 jours</strong>.
      </p>

      <h2>9. Cookies et traceurs</h2>
      <p>
        Le Site n'utilise <strong>aucun cookie publicitaire ni traceur tiers</strong>. Nous utilisons uniquement :
      </p>
      <ul>
        <li>Un <strong>jeton de session</strong> stocké en <code>localStorage</code> pour maintenir votre connexion</li>
        <li>Aucun outil d'analyse comportementale (ni Google Analytics, ni Meta Pixel, ni équivalent)</li>
      </ul>

      <h2>10. Transferts de données hors Côte d'Ivoire</h2>
      <p>
        Certains sous-traitants (Supabase, Anthropic) sont situés hors de Côte d'Ivoire. Ces transferts sont encadrés par des garanties contractuelles (clauses contractuelles types, mesures techniques de sécurité).
      </p>

      <h2>11. Réclamation auprès de l'ARTCI</h2>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de l'<a href="https://www.artci.ci" target="_blank" rel="noopener noreferrer">Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire (ARTCI)</a>.
      </p>

      <h2>12. Modifications de la politique</h2>
      <p>
        Nous pouvons mettre à jour cette politique pour refléter les évolutions légales ou techniques. En cas de modification substantielle, vous serez informé(e) par email avant son entrée en vigueur.
      </p>
    </LegalLayout>
  )
}
