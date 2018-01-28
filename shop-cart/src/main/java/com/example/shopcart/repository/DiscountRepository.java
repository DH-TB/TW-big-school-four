package com.example.shopcart.repository;

import com.example.shopcart.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount,Long> {
    Discount findOneByBarcode(String barcode);
}
