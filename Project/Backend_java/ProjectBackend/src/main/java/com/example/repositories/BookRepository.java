package com.example.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.BookEntity;
import com.example.entities.SelfAuthorEntity;

public interface BookRepository extends JpaRepository<BookEntity,Long>{
@Query("Select b from BookEntity b where b.status='APPROVED' order by b.updatedAt desc")
List<BookEntity> recentlyAddedBooks(Pageable page);
boolean existsByBookTitle(String title);
@Query("Select book from BookEntity book where book.status='PENDING'")
public List<BookEntity> getPendingBooks();
@Query("Select book from BookEntity book where book.category.name=:name and book.status='APPROVED'")
public List<BookEntity> getBookByCategory(String name);
@Query("Select book from BookEntity book where (book.bookTitle like %:name% or book.longDesc like %:name%) and book.status='APPROVED'")
public List<BookEntity> getBookByTerm(String name);
@Query(nativeQuery = true,value="SELECT * from book b inner join (select book_id from order_item group by book_id order by count(book_id)) o on b.id=o.book_id ")
List<BookEntity> trendingBooks(Pageable page);
}
