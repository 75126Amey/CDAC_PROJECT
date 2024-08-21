package com.example.entities;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "book")
@EqualsAndHashCode(callSuper = false,onlyExplicitlyIncluded = true)
public class BookEntity extends BaseEntity{
@Column(length = 20)
private String isbn;
@EqualsAndHashCode.Include
private String bookTitle;
private String bookSubtitle;
@Column(nullable = false)
double basePrice;
boolean isRentable;
@Column(length = 5000)
String longDesc;
@Column(length = 500)
String shortDesc;
@ManyToOne
@JoinColumn(name = "publisher_id")
PublisherEntity publisher;
String coverImage;
String manuscript;
@Column(nullable = false)
int pages;
LocalDate datePublished;
@Enumerated(EnumType.STRING)
Status status;
@ManyToOne
@JoinColumn(name = "category_id")
CategoryEntity category;
@Column(name = "rent_price")
Double rentPerDay;
@ManyToMany
@JoinTable(name="book_keyword",
joinColumns = @JoinColumn(name="book_id"),
inverseJoinColumns = @JoinColumn(name="keyword_id"))	
private Set<KeywordsEntity> keywords = new HashSet<>();

@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
private Set<BookAuthorEntity> bookAuthors = new HashSet<>();
 
public void addAuthors(ProAuthorEntity author,int ord) {
    BookAuthorEntity bookAuthor = new BookAuthorEntity(this, author,ord);
    bookAuthors.add(bookAuthor);
}
//
//public void removeRole(ProAuthorEntity author)) {
//    for (Iterator<BookAuthorEntity> iterator = bookAuthors.iterator(); iterator.hasNext();) {
//        BookAuthorEntity bookAuthor = iterator.next();
//
//        if (bookAuthor.getBook().equals(this) && bookAuthor.getAuthor().equals(author)) {
//            iterator.remove();
//            userRole.setUser(null);
//            userRole.setRole(null);
//        }
//    }
//}
}

