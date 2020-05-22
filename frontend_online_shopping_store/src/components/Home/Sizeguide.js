import React, {Component}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import Table from 'react-bootstrap/Table';

export default class Sizeguide extends Component {
  render() {
    return (
      <div>
      <NavBar/>
      <div className="main-container">
        <div className="container mt-4 category-container">
          <div className="row">

              <div className="col-md-12 cus-service">
              <h2>Size Guide</h2>
              <h4>How do I Measure?</h4>
              <h5><b>Bust</b></h5>
              <p>Measure the bust around the body at the most outward part just below the armpit.</p>
              <h5><b>Waist</b></h5>
              <p>Measure the waist around the natural waistline tightly. Bend one side to find the natural crease.</p>
              <h5><b>Hip</b></h5>
              <p>Measure around the body at the widest point of the hipline.</p>
              </div>
          </div>
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>UK Size</th>
                <th>Bust (cm)</th>
                <th>Waist (cm)</th>
                <th>Hip (cm)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>6</td>
                <td>80</td>
                <td>65</td>
                <td>87.5</td>
              </tr>
              <tr>
                <td>8</td>
                <td>84</td>
                <td>67.5</td>
                <td>91.5</td>
              </tr>
              <tr>
                <td>10</td>
                <td>86.5</td>
                <td>71</td>
                <td>95</td>
              </tr>
              <tr>
                <td>12</td>
                <td>90</td>
                <td>74</td>
                <td>99</td>
              </tr>
              <tr>
                <td>14</td>
                <td>94</td>
                <td>79</td>
                <td>105.5</td>
              </tr>
              <tr>
                <td>16</td>
                <td>99</td>
                <td>84</td>
                <td>110.5</td>
              </tr>
            </tbody>
          </Table>

          <h2>Size Conversion</h2>
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>UK</th>
                <th>EU</th>
                <th>US</th>
                <th>AU</th>
                <th>RUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>6</td>
                <td>34</td>
                <td>2</td>
                <td>6</td>
                <td>40</td>
              </tr>
              <tr>
                <td>8</td>
                <td>36</td>
                <td>4</td>
                <td>8</td>
                <td>42</td>
              </tr>
              <tr>
                <td>10</td>
                <td>38</td>
                <td>6</td>
                <td>10</td>
                <td>44</td>
              </tr>
              <tr>
                <td>12</td>
                <td>40</td>
                <td>8</td>
                <td>12</td>
                <td>46</td>
              </tr>
              <tr>
                <td>14</td>
                <td>42</td>
                <td>10</td>
                <td>14</td>
                <td>48</td>
              </tr>
              <tr>
                <td>16</td>
                <td>44</td>
                <td>12</td>
                <td>16</td>
                <td>50</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      </div>
    )
  }
}
