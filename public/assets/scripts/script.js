/* eslint no-underscore-dangle: 0 */
function appendComment(comment) {
  const article = $('<article>');
  article.addClass('mb-2');

  let { body } = comment;
  body = body.replace(/</g, '&lt;');
  body = body.replace(/>/g, '&gt;');

  article.append(body);
  article.append(`<i class="fas fa-times fa-lg delete-comment float-right text-danger" data-id=${comment._id}></i>`);
  article.append('<hr>');
  article.attr('data-id', comment._id);
  article.addClass('comment');
  $('#article-comments').append(article);
}

function disablePageLinks() {
  const prevPage = Number($('#prevPage').attr('data-page'));
  const nextPage = Number($('#nextPage').attr('data-page'));
  const pageCount = Number($('#pageCount').attr('data-pageCount'));
  if (prevPage <= 0) {
    $('#prevPage').addClass('d-none');
  }
  if (nextPage > pageCount) {
    $('#nextPage').addClass('d-none');
  }
}

$(document).on('click', '.delete-comment', (event) => {
  const commentID = $(event.currentTarget).attr('data-id');
  console.log(commentID);

  const commentArticle = $(`.comment[data-id=${commentID}]`);
  console.log(commentArticle);
  $.ajax({
    type: 'DELETE',
    url: `/api/comments/${commentID}`,
  }).then(() => {
    commentArticle.remove();
  });
});

$(document).ready(() => {
  disablePageLinks();

  $('.view-comments').on('click', (event) => {
    const articleID = $(event.currentTarget).attr('data-id');
    const articleTitle = $(event.currentTarget).parent().parent().find('.article-title')
      .text();
    $('#article-title').text(articleTitle);
    $('#article-ID').text(articleID);
    $('#add-comment').attr('data-id', articleID);
    $('#article-comments').empty();
    $.getJSON(`/api/articles/${articleID}/comments`, (data) => {
      const { comments } = data[0];
      if (comments.length < 1) {
        $('#article-comments').append('<h3>No comments yet for this article</h3>');
      } else {
        comments.forEach((comment) => {
          appendComment(comment);
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
      appendComment(data);
      $('#comment-textarea').val('');
      $('#article-comments h3').remove();
    });
  });
});
