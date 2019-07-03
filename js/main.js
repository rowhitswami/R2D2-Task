$(document).ready(function () {
	$('.modal').modal();

	var movie_title = {};

	$.getJSON('js/movies.json', function (json) {

		// Loop to iterate title of the movie
		var i;
		for (i = 0; i < json.length; i++) {

			movie_title[json[i].title] = null;
		}

	});


	$('input.autocomplete').autocomplete({

		data: movie_title,
		onAutocomplete: function (val) {
			var request = new XMLHttpRequest();
			request.open("GET", "js/movies.json", false);
			request.send(null)
			var my_JSON_object = JSON.parse(request.responseText);
			for (k = 0; k < my_JSON_object.length; k++) {
				if (my_JSON_object[k].title == val) {

					var poster = my_JSON_object[k].posterurl;
					var title = my_JSON_object[k].title;
					var rating = my_JSON_object[k].imdbRating;
					var year = my_JSON_object[k].year;
					var storyline = my_JSON_object[k].storyline;
					var actors = my_JSON_object[k].actors;
					var genres = my_JSON_object[k].genres;

					document.getElementById('movie-info').innerHTML =
						`
	 	         		<div class="row ">
							    <div class="col s8 offset-s2 ">
							        <div style="border-radius: 15px;"  class="card horizontal z-depth-5">
								          <div class="card-image">
								            <img class="responsive-img" style="border-radius: 15px 0 0 15px;"  src="` + poster + `">
								          </div>
								          <div class="card-stacked">
								            <div class="card-content">
								            <p><b>Title: </b>` + title + `</p> 
								            <p><b>IMBD Rating: </b>` + rating + `</p> 
								            <p><b>Year: </b>` + year + `</p>
								            <p><b>Actors: </b>` + actors + `</p>
								            <p><b>Genre: </b>` + genres + `</p>
										  </div>
								          <div class="card-action center">
								            <a class="btn-floating pulse waves-effect waves-light indigo modal-trigger" href="#modal1"><i class="material-icons">add</i></a>
								           </div>           
							          </div>
							        </div>
							      </div>
							  </div>
							  
							  `;
					document.getElementById('modal1').innerHTML =
						`
							  <div class="modal-content">
							    <h4>` + title + ` Storyline</h4>
							    <p>` + storyline + `</p>
							  </div>
							  <div class="modal-footer">
							    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
							  </div>

							  `;
				}

			}
		}
	});
});