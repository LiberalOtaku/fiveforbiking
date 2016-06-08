var report = {
  init: function(formSelector, url) {
    this.form = $(formSelector);
    this.url = url;
    this.setupEventListeners();
  },

  setupEventListeners: function() {
    this.form.onsubmit = this.submitForm.bind(this);
  },

  submitForm: function(event) {
    event.preventDefault();
    $.ajax({
      url: this.url,
      method: 'post',
      contentType: "application/json",
      data: JSON.stringify({
        "issue": {
          "name": this.form.name.value,
          "email": this.form.email.value,
          "subject": this.form.subject.value,
          "message": this.form.message.value,
        }
      }),
      success: function(issue) {
        $('div.alert-area').html(' \
          <div class="alert alert-success" role="alert"> \
            Report successfully submitted! \
          </div>');

        this.form.reset();
        this.form.clientName.focus();
      },
      error: function(xhr, status, error) {
        $('div.alert-area').html(' \
          <div class="alert alert-danger" role="alert"> \
            Oops, something went wrong (Error ' + error + ': ' + status + ')! Please try again later. \
          </div>');
      }
    });
  },

};

report.init('#issueForm', 'http://liberalotaku.github.io/fiveforbiking/Five%20For%20Biking/www/json/issues.json/');
