document.addEventListener('DOMContentLoaded', function () {
    // Récupérer l'élément du calendrier
    var calendarEl = document.getElementById('calendar'); 

    // Initialiser le calendrier FullCalendar
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',  // Vue par défaut (mois)
        events: function(info, successCallback, failureCallback) {
            // Récupérer les événements depuis l'API avec AJAX
            fetch('http://localhost/SAE301Local/api/get_event.php') // Remplacez par l'URL de votre API
                .then(response => response.json())
                .then(data => {
                    // Ajouter les événements dans FullCalendar
                    const events = data.events.map(event => ({
                        id: event.id,  // ID de l'événement pour l'édition
                        title: event.titre,
                        start: event.date_event,  // Date de début de l'événement
                        description: event.description,  // Description de l'événement
                        location: event.lieu,  // Lieu de l'événement
                        type: event.type,  // Type de l'événement
                    }));
                    
                    successCallback(events); // Ajouter les événements au calendrier
                })
        },
      
        // Personnalisation de l'affichage des événements (ajout de la croix)
        eventContent: function(info) {
            var deleteLink = '<a href="?delete_id=' + info.event.id + '" class="delete-event" style="color: red; font-size: 18px;">&#10006;</a>';
            var content = document.createElement('div');
            content.innerHTML = '<span>' + info.event.title + '</span>' + deleteLink;
            return { domNodes: [content] };
        },
        

        // Ajouter un gestionnaire pour le clic sur un événement
        eventClick: function(info) {
            // Récupérer l'ID de l'événement
            var eventId = info.event.id;
            
            // Rediriger vers la page de modification avec l'ID de l'événement
            window.location.href = "?edit_id=" + eventId;
        }
    });

    // Rendre le calendrier visible
    calendar.render();
});
