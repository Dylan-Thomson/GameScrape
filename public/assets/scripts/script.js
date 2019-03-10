$(document).ready(() => {
  $('.view-comments').on('click', (event) => {
    const articleID = $(event.currentTarget).attr('data-id');
    $('#article-ID').text(articleID);
    $('#add-comment').attr('data-id', articleID);
    $('#article-comments').empty();
    $.getJSON(`/api/articles/${articleID}/comments`, (data) => {
      const { comments } = data[0];
      if (comments.length < 1) {
        $('#article-comments').append('No comments yet for this article');
      } else {
        comments.forEach((comment) => {
          let { body } = comment;
          body = body.replace(/</g, '&lt;');
          body = body.replace(/>/g, '&gt;');
          console.log(body);
          $('#article-comments').append(`<article>${body}</article>`);
        });
      }
      $('#comment-modal').modal().show();
    });
  });

  $('#add-comment').on('click', (event) => {
    event.preventDefault();
    const articleID = $(event.currentTarget).attr('data-id');
    const comment = { body: $('#comment-textarea').val() };
    $.post(`/api/articles/${articleID}/comments`, comment, (data) => {
      // Append new comment, clear textarea
      console.log(data);
    });
  });
});
