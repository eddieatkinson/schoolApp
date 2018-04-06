import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

class Syllabus extends Component {
  constructor() {
    super();
    this.state = {
      numPages: null,
      pageNumber: 1
    }
  }


  onDocumentLoad(numPages) {
    this.setState(numPages);
  }

  render() {
    console.log('This is the syllabus!')
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <h1>Syllabus</h1>
        <Document
          file="English2Syllabus.pdf"
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}


export default Syllabus;