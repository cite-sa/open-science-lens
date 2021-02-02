document.addEventListener( 'DOMContentLoaded', function () {
	document.getElementById( "myButton" ).addEventListener( 'click', buttonClicked );
} );

function buttonClicked() {
	console.log( "Hello, I have been clicked!" );
}