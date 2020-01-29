//created array for dogs
let dogs = ['German Shepherd', 'Husky', 
            'Poodle', 'Corgi', 'Chihuahua', 
            'Bulldog', 'Golden Retriever', 
            'Australian Shepherd', 'Collie'];
//created function to loop through dogs array and append puppy-tags class to the buttons
function LoadButtons() {
    $('.puppy-tags').html('');
    for (let i = 0; i < dogs.length; i++) {
        $('.puppy-tags').append('<button type="button" class="btn btn-primary btn-tag">' + dogs[i] + '</button>');
    }
    //click event for buttons to show puppy names, then display gifs
    $('.btn-tag').on('click', function () {
        let searchText = $(this).text();
        $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search',
            method: 'GET',
            data: {
                api_key: 'puce7Gh9bnGNMhVSKcCsdj4ivGs7cuzR',
                q: searchText,
                limit: 10
            }
        }).then(function (response) {
            loadImages(response.data)
        });
    });
}
//function to load gifts as still, then animated, then still image // appended image rating to puppy-gifs class
function loadImages(gifsData) {
    $('.puppy-gifs').html('');
    for (let i = 0; i < gifsData.length; i++) {
        console.log(gifsData[i]);
        let className = 'image-' + i;
        let imageRating = gifsData[i].rating;
        let stillImage = gifsData[i]['images']['downsized_still'].url;
        let gifImage = gifsData[i]['images']['downsized'].url;
        let altImage = gifsData[i].slug;
        $('.puppy-gifs').append('<div class="col-md-auto"><p>'+imageRating+'</p><img width="200" height="auto" src="' + stillImage + '" class="rounded img-thumbnail ' + className + '" alt="' + altImage + '"></div>');
        $("."+ className).on('click', function () {
            if ( $(this).attr('src') === stillImage){
                $(this).attr('src', gifImage);
            }else{
                $(this).attr('src', stillImage);
            }
            
        });
    }
}
//enabled user to add additional puppy tag
$(document).ready(function () {
    LoadButtons();
    $('#add-tag-button').on('click' ,function(){
        let addText = $('.add-text').val();
        if (addText !== ''){
           dogs.push(addText);
           LoadButtons();
           $('.add-text').val('');
        } else {
            alert("Please enter valid puppy name.");
        }
    });
    
});
