$(document).ready( function() {
	var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users';

	function deleteUser(user) {
		$.ajax({
			url: baseUrl + '/' + user.id,
			type: 'DELETE'
		})
	}

	function addUser(user) {
		var row = '<tr data-id="' + user.id + '">';
			row += '<td>' + user.first_name + '</td>';
			row += '<td>' + user.last_name  + '</td>';
			row += '<td>' + user.phone_number + '</td>';
			row += '<td><button class="btn blue edit">Edit</button><button class="btn red delete">Delete</button></td>'
			row += '</tr>'
		tbody.append(row);
	};	

	if(location.pathname === '/') {
		function getUsers() {
			$.ajax({
				url: baseUrl,
				type: 'GET',
				dataType: 'JSON'
			}).done( function(data) {
				tbody = $('#users_tbody');
				tbody.children().remove();
				data.users.forEach( function(user) {
					if(user.first_name.match(/.*poopy pants.*|.*first name.*/)) {
						deleteUser(user);
					}
					addUser(user);
				})
			})
		}
		getUsers()
	}

	$(document).on('click', '.edit', function() {
		id = $(this).closest('tr').data().id;
		location.pathname = '/edit_user/' + id;
	});

	$(document).on('click', '.delete', function() {
		id = $(this).closest('tr').data().id;
		$.ajax({
			url: baseUrl + '/' + id,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( function() {
			getUsers();
		})
	})

	$('#new_user').on('submit', function(e) {
		var form = $(this);
		e.preventDefault();
		$.ajax({
			url: baseUrl,
			type: 'POST',
			dataType: 'JSON',
			data: $(this).serializeArray()
		}).done( function(data) {
				debugger
				form[0].reset();
				addUser(data.user);
		})
	})

	var re = /\/edit_user\/\d+/
	if(location.pathname.match(re)) {
		id = $('#edit_form').data().id;
		$.ajax({
			url: baseUrl + '/' + id,
			type: 'GET',
			dataType: 'JSON'
		}).done( function(data){
			$('#first_name').val(data.user.first_name);
			$('#last_name').val(data.user.last_name);
			$('#phone_number').val(data.user.phone_number);
		})
	}

	$('#edit_form').on('submit', function(e) {
		e.preventDefault();
		id = $('#edit_form').data().id;
		debugger
		$.ajax({
			url: baseUrl + '/' + id,
			type: 'PUT',
			dataType: 'JSON',
			data: $(this).serializeArray()
		}).done( function() {
			debugger
			location.pathname = '/';
		}).fail( function() {
			alert('Something went wrong')
		})
	})

});




