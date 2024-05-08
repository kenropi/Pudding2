$(document).ready(function() {
    $('#registrationForm').submit(function(e) {
      e.preventDefault();
  
      const name = $('#name').val();
      const email = $('#email').val();
      const phone = $('#phone').val();
      const event = $('#eventsToAttend').val();
  
      let errors = [];
  
      if (name.length < 3) {
        errors.push("Name must be at least 3 characters long.");
      }
  
      if (!email.includes('@')) {
        errors.push("Invalid email address.");
      }
  
      if (phone.length !== 14 || !phone.startsWith('08')) {
        errors.push("Invalid phone number.");
      }
  
      if (!event) {
        errors.push("Please select an event to attend.");
      }
  
      if (errors.length > 0) {
        $('#errorMessages').html('<div class="alert alert-danger">' + errors.join('<br>') + '</div>');
        return;
      }
  
      const formData = {
        name: name,
        email: email,
        phone: phone,
        event: event
      };
  
      $.ajax({
        type: 'POST',
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(response) {
          $('#name').val('');
          $('#email').val('');
          $('#phone').val('');
          $('#eventsToAttend').val('');
  
          $('#errorMessages').html('<div class="alert alert-success">Registration successful!</div>');
        },
        error: function(xhr, status, error) {
          $('#errorMessages').html('<div class="alert alert-danger">Error occurred. Please try again later.</div>');
          console.error("Error:", error);
        }
      });
    });
  });
  