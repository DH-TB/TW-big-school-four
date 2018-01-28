package com.example.shopcart.repository;

import com.example.shopcart.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item,Long> {
    Item findOneByBarcode(String barcode);
}
