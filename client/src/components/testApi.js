class Api extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    const { apiResponse } = this.state;

    return (
      <div>
        <p>{apiResponse}</p>
      </div>
    );
  }
}
