import LegalLayout from '../components/LegalLayout'

export default function MentionsLegales() {
  return (
    <LegalLayout
      title="Mentions légales"
      subtitle="Informations relatives à l'éditeur, à l'hébergement et aux conditions d'utilisation du site my-new-body."
      lastUpdate="9 octobre 2026"
    >
      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>My New Body</strong> (ci-après « le Site ») est édité par :
      </p>
      <ul>
        <li><strong><a href="https://mexwebsolutions.com" target="_blank" rel="noopener noreferrer">Mexiale</a></strong>, entreprise individuelle en Côte d'Ivoire</li>
        <li>Adresse : Deux-Plateaux, Abidjan, République de Côte d'Ivoire</li>
        <li>Contact : <a href="mailto:contact@mexwebsolutions.com">contact@mexwebsolutions.com</a></li>
      </ul>

      <h2>Direction de la publication</h2>
      <p>
        La direction de la publication est assurée par <strong><a href="https://mexwebsolutions.com" target="_blank" rel="noopener noreferrer">Mexiale</a></strong>.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le Site et les services associés sont hébergés par :
      </p>
      <ul>
        <li><strong>Hostinger International Ltd.</strong> : hébergement web du site vitrine<br/>
        61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
        <li><strong>Supabase Inc.</strong> : base de données et services d'authentification<br/>
        Région : Europe (eu-west-3, Paris, France)</li>
        <li><strong>Anthropic PBC</strong> : fournisseur de l'API d'intelligence artificielle (Claude)<br/>
        San Francisco, Californie, États-Unis</li>
      </ul>

      <h2>Statut légal du service</h2>
      <p>
        <strong>My New Body</strong> est actuellement en <strong>phase alpha fermée</strong>, limitée à 10 testeuses et testeurs volontaires sur une durée de 7 jours. Le service est fourni gratuitement durant cette phase, à des fins exclusives de validation et d'amélioration du produit.
      </p>
      <div className="callout">
        <p>
          <strong>⚖️ Conformité ARTCI :</strong> Conformément à la <a href="https://www.artci.ci" target="_blank" rel="noopener noreferrer">Loi n°2013-450 de la République de Côte d'Ivoire</a> relative à la protection des données à caractère personnel, une <strong>Autorisation Préalable</strong> auprès de l'Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire (ARTCI) sera obtenue avant tout lancement officiel et commercial du service.
        </p>
      </div>

      <h2>Nature du service</h2>
      <p>
        My New Body est un <strong>coach bien-être numérique</strong> propulsé par l'intelligence artificielle. Il propose des recommandations personnalisées autour de trois piliers : Physique, Nutrition et Mental.
      </p>
      <div className="callout">
        <p>
          <strong>🏥 Avertissement médical :</strong> My New Body n'est <strong>pas un dispositif médical</strong> et ne remplace en aucun cas une consultation médicale, un diagnostic ou un traitement. En cas d'urgence vitale, contactez immédiatement le <strong>SAMU au 185</strong> (Côte d'Ivoire).
        </p>
      </div>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur le Site (textes, graphismes, logos, images, code source, charte graphique) est la propriété exclusive de <a href="https://mexwebsolutions.com" target="_blank" rel="noopener noreferrer">Mexiale</a> ou de ses partenaires et est protégé par les lois en vigueur sur la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, des éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.
      </p>

      <h2>Liens hypertextes</h2>
      <p>
        Le Site peut contenir des liens vers des sites tiers. <a href="https://mexwebsolutions.com" target="_blank" rel="noopener noreferrer">Mexiale</a> ne saurait être tenue responsable du contenu, des pratiques ou des politiques de confidentialité des sites tiers accessibles via ces liens.
      </p>

      <h2>Modification des mentions légales</h2>
      <p>
        <a href="https://mexwebsolutions.com" target="_blank" rel="noopener noreferrer">Mexiale</a> se réserve le droit de modifier à tout moment les présentes mentions légales. Les utilisateurs sont invités à les consulter régulièrement. La date de dernière mise à jour figure en haut de ce document.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit ivoirien. Tout litige relatif à l'utilisation du Site relève de la compétence exclusive des tribunaux d'Abidjan, Côte d'Ivoire.
      </p>

      <h2>Nous contacter</h2>
      <p>
        Pour toute question concernant ces mentions légales :
      </p>
      <ul>
        <li>Email : <a href="mailto:contact@mexwebsolutions.com">contact@mexwebsolutions.com</a></li>
        <li>Adresse : <a href="https://mexwebsolutions.com" target="_blank" rel="noopener noreferrer">Mexiale</a>, Deux-Plateaux, Abidjan, Côte d'Ivoire</li>
      </ul>
    </LegalLayout>
  )
}
