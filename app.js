function sec2time(seconds) {

	if (seconds <= 0) { return false; }

	var hours = Math.floor(seconds / 3600);
	var mins = Math.floor((seconds - (hours*3600)) / 60);
	var secs = Math.floor(seconds % 60);

	mins = (mins<10) ? '0'+mins : mins;
	secs = (secs<10) ? '0'+secs : secs;

	return mins + ':' + secs + '/km';
}


function slugify(str) {
	
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to   = "aaaaeeeeiiiioooouuuunc------";
	for (var i=0, l=from.length ; i<l ; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return str;

	// ----------------
	// https://gist.github.com/mathewbyrne/1280286
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}



var ngApp = angular.module('ngApp', ['ngRoute']);

	// ----------------------
	// Router
	ngApp.config(['$routeProvider',

		function( $routeProvider ) {
			$routeProvider
				.when('/races', { 
					controller: 'mainController',
					template: ' '
				})
				.when('/race/:slug', { 
					controller: 'mainController',
					template: ' '
				})
				.otherwise({redirectTo: '/races'});
		}
	]);


	// ----------------------
	// Controllers
	ngApp.controller('mainController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

		$http.get('data/races.json').then(

			function(success) {

				$scope.data = success.data;

				angular.forEach($scope.data, function(obj){
					// -- Calculate Pace
					var chiptime = obj.time_chip + '';   // your input string
					var chiptime_chunk = chiptime.split(':');
					var chiptime_seconds = (+chiptime_chunk[0]) * 60 * 60 + (+chiptime_chunk[1]) * 60 + (+chiptime_chunk[2]); 

					var km = obj.distance/1000;
					var pace = (!!chiptime_seconds && !!km) ? Math.round(chiptime_seconds/km) : 0;

						// Insert Pace
						obj.pace = sec2time(pace);

					// -- Calculate Percent
					var percent = (!!obj.position && !!obj.participants) ? ((obj.position*100)/obj.participants).toFixed(2) + '%' : false;

						// Insert Percent
						obj.percent = percent;

					// -- Create Slug
					obj.slug = slugify(obj.title);

				});
			},

			function(error) { /* TBD : error handling */ }

		);

		$scope.filtering = ['-timestamp'];
		$scope.currentFiltering = '-timestamp';

		$scope.setFiltering = function(prop) {
			var add = prop;
			if (prop == $scope.currentFiltering) {
				add = '-'+prop;
			}

			$scope.currentFiltering = add;
			$scope.filtering = [add, '-timestamp'];
		}

		$scope.clearQuery = function() {
			$scope.query = '';
		}



		$scope.the_slug = '-----';
		$scope.detail = 'detail-close';			

		$scope.showDetail = function(slug) {
			$scope.the_slug = slug;
			$scope.detail = 'detail-open';
		}

		$scope.closeDetail = function() {
			$scope.the_slug = '-----';
			$scope.detail = 'detail-close';	
		}

		
		// Check for slug init
		$scope.$on('$routeChangeSuccess', function() {
		    if ( !!$routeParams.slug ) {
		    	$scope.showDetail( $routeParams.slug );
		    }
		});



	}]);

	// ----------------------
	// Filters
	ngApp
		.filter('dateFilter', function() {
			return function(input) {
				return input.replace(' ', 'T');
			};
		})
		.filter('falseFilter', function() {
			return function(input) {
				return (input == false) ? '--' : input;
			};
		});	

