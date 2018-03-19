package com.example.shopcart.controller;

import com.example.shopcart.entity.Discount;
import com.example.shopcart.entity.Item;
import com.example.shopcart.repository.DiscountRepository;
import com.example.shopcart.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class itemController {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private DiscountRepository discountRepository;

    @GetMapping("/item")
    public ResponseEntity addItem() {
        List<Item> items = itemRepository.findAll();
        if (items.size() == 0) {
            initItem();
            initDiscount();
            return new ResponseEntity<>(itemRepository.findAll(), HttpStatus.OK);
        }
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    private void initItem() {
        itemRepository.save(new Item("ITEM000000", "可口可乐", 3.00, "瓶"));
        itemRepository.save(new Item("ITEM000001", "雪碧", 3.00, "瓶"));
        itemRepository.save(new Item("ITEM000002", "苹果", 5.50, "斤"));
        itemRepository.save(new Item("ITEM000003", "荔枝", 15.00, "斤"));
        itemRepository.save(new Item("ITEM000004", "电池", 2.00, "个"));
        itemRepository.save(new Item("ITEM000005", "方便面", 4.50, "袋"));
    }

    private void initDiscount() {
        discountRepository.save(new Discount("ITEM000000", "BUY_TWO_GET_ONE_FREE"));
        discountRepository.save(new Discount("ITEM000001", "BUY_TWO_GET_ONE_FREE"));
        discountRepository.save(new Discount("ITEM000005", "BUY_TWO_GET_ONE_FREE"));
    }

}

