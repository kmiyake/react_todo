var Tasks = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },

  fetchTasks: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data.tasks });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleTaskSubmit: function (task) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: task,
      success: function (data) {
        this.setState({ data: this.state.data.concat([data]) });
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({ data: this.state.data });
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function () {
    this.fetchTasks();
    setInterval(this.fetchTasks, this.props.pollingInterval);
  },

  render: function() {
    return (
        <div>
          <h1>Tasks</h1>
          <TaskList data={this.state.data} />
          <TaskForm onTaskSubmit={this.handleTaskSubmit} />
        </div>
        );
  }
});

var TaskList = React.createClass({

  render: function () {
    var taskListItems = this.props.data.map(function(task) {
      return (
          <TaskListItem name={task.name} />
          );
    });
    return (
        <ul className="tasks">
          {taskListItems}
        </ul>
        );
  }
});

var TaskListItem = React.createClass({

  render: function () {
    return (
        <li className="task">
          <h2>{this.props.name}</h2>
        </li>
        );
  }
});

var TaskForm = React.createClass({
  getInitialState: function () {
    return { name: '' };
  },

  handleNameChange: function (e) {
    this.setState({ name: e.target.value });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var name = this.state.name.trim();
    if (!name) {
      return;
    }
    this.props.onTaskSubmit({ task: { name: name } });
    this.setState({ name: '' });
  },

  render: function () {
    return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="タスク名" value={this.state.name} onChange={this.handleNameChange} />
          <input type="submit" value="登録" />
        </form>
        );
  }
});
