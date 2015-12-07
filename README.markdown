# racelist.angular

## AngularJS JSON Data Table Sample App

#### Live URL: http://alterebro.github.io/racelist.angular/


Sample AngularJS Web Application featuring data display using external JSON file, table sorting, result filtering, responsive layout and detail modal windows based on routing.

- Click respective table header column to sort by each property. Sort order is displayed on the column heading (ascending or descending). Default sorting is by date descending.

- Results can be filtered through the top text input box. Some sample input terms could be: '10000' to show all 10K races, '21097' in order to show half marathon races... The filter is reset with the clear button.

- Number of columns are different depending of the width of the browser, all columns are showed when viewport is 1200px wide or bigger, otherwise properties are trimmed. The detail modal window shows all properties in all cases anyway.

- Details modal window layout has got its own url using a slug based on the race title created on runtime. It works using the route parameters to modify the layout instead of 
having different views/partials.



This sample web app was built using:
	
- **Angular** : JavaScript MVC framework https://angularjs.org/
- **LESS** : CSS Preprocessor http://lesscss.org/
- **Harp** : Static Web Server http://harpjs.com/
- **armazon.css** : CSS3 mini framework https://github.com/alterebro/armazon.css
