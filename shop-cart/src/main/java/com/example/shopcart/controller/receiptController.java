package com.example.shopcart.controller;

import com.example.shopcart.entity.Discount;
import com.example.shopcart.entity.Item;
import com.example.shopcart.entity.Receipt;
import com.example.shopcart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

/*
***<没钱赚商店>收据***
        名称:可口口可乐,数量量:3瓶,单价:3.00(元),小小计:6.00(元)
        名称:羽羽毛毛球,数量量:5个,单价:1.00(元),小小计:4.00(元)
        名称:苹果,数量量:2斤斤,单价:5.50(元),小小计:11.00(元)
        ----------------------
        总计:21.00(元)
        节省:4.00(元)
        **********************
[
{
type: 'BUY_TWO_GET_ONE_FREE',
barcodes: 'ITEM000000'
},
{
type: 'BUY_TWO_GET_ONE_FREE',
barcodes:'ITEM000001'
},
{
type: 'BUY_TWO_GET_ONE_FREE',
barcodes:'ITEM000005'
}
]

*/
@RestController
@RequestMapping("/api")
public class receiptController {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private ReceiptRepository receiptRepository;

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

    @PostMapping("/receipt")
    public ResponseEntity getReceipt(@RequestBody List<String> items) {
        String receiptText = "";
        Double saveTotal = 0.00;
        Double total = 0.00;

        for (String item : items) {
            String[] itemInfo = item.split("-");
            String barcode = itemInfo[0];
            Integer count = Integer.parseInt(itemInfo[1]);

            Item item1 = itemRepository.findOneByBarcode(barcode);

            String name = item1.getName();
            String unit = item1.getUnit();
            Double price = item1.getPrice();
            Double subTotal = count * price;


            if (count >= 3) {
                Discount itemDiscount = discountRepository.findOneByBarcode(barcode);
                if (itemDiscount != null && itemDiscount.getType().equals("BUY_TWO_GET_ONE_FREE")) {
                        Double saved = (count / 3) * price;
                        subTotal -= saved;
                        saveTotal += saved;
                }
            }
            total += subTotal;
            receiptText += "名称:" + name + ",数量:" + count + unit + ",单价:" + format(price) + "(元),小计:" + format(subTotal) + "(元)\n";
        }

        String receipt = "***<没钱赚商店>收据***\n" +
                receiptText +
                "----------------------\n" +
                "总计:" + format(total) + "(元)\n" +
                "节省:" + format(saveTotal) + "(元)\n" +
                "**********************";
        ArrayList result = new ArrayList();
        result.add(receipt);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    private String format(Double price) {
        DecimalFormat df = new DecimalFormat("0.00");
        return df.format(price);
    }
}

