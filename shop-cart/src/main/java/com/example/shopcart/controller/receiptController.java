package com.example.shopcart.controller;

import com.example.shopcart.entity.Discount;
import com.example.shopcart.entity.Item;
import com.example.shopcart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class receiptController {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private DiscountRepository discountRepository;

    @GetMapping("/receipt/{shopCart}")
    public ResponseEntity getReceipt(@PathVariable List<String> shopCart) {
        String receiptText = "";
        Double saveTotal = 0.00;
        Double total = 0.00;

        for (String shop : shopCart) {
            String[] shopInfo = shop.split("-");
            String barcode = shopInfo[0];
            Integer count = Integer.parseInt(shopInfo[1]);

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

