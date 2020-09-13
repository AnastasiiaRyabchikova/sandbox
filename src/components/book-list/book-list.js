import './book-list.css';

import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils'; 



class BookList extends Component {
    componentDidMount() {
        const { bookstoreService, booksLoaded } = this.props;
        bookstoreService.getBooks().then((data) => booksLoaded(data));
    }
    render() {
        const { books, loading } = this.props;
        console.log(loading);
        if (loading) return <Spinner />;
        return (
            <ul className="book-list">
                {
                    books.map((book) => {
                        return (
                            <li key={book.id} className="book-list__item">
                                <BookListItem book={book}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = ( { books, loading } ) => {
    return { books, loading }
}

const mapDispatchToProps = {
    booksLoaded
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);