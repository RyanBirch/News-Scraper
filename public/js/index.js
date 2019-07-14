$('#submitComment').on('click', function() {

  let comment = $('#comment').val().trim()

  $.post('/api/addComment', comment)
    .then(data => {

    })
})