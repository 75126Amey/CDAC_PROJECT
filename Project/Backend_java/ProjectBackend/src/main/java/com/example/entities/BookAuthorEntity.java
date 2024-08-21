package com.example.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="book_author")
@NoArgsConstructor
@Getter
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class BookAuthorEntity {
@EmbeddedId
private BookAuthorId id = new BookAuthorId();
@EqualsAndHashCode.Include
@ManyToOne
@MapsId("bookId")
private @Setter BookEntity book;
@EqualsAndHashCode.Include
@ManyToOne
@MapsId("authorId")
private @Setter ProAuthorEntity author;
private @Setter int ordinal;
public BookAuthorEntity(BookEntity book,ProAuthorEntity author,int ordinal) {
	this.book = book;
	this.author = author;
	this.ordinal = ordinal;
}
public void setBookAuthorId() {
	id.setAuthorId(author.getId());
	id.setBookId(book.getId());
}
}
