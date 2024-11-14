import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useSearchParams } from "react-router-dom";
import { axiosData } from "../../util/api";
import { displayText, filterItems } from "../../util/filterItems";
import Cookies from "js-cookie";
import { styles } from "../styles/productDetailStyle";
import { toast } from "react-toastify";
import AmazonPayButton from "./amazonPayBtn";

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(false);
  const [amount, setAmount] = useState('0.00'); // Default amount

  const getData = async () => {
    const productID = searchParams.get("product");
    const res = await axiosData("/getProductByProductID", {
      id: productID,
    });
    setProduct(res[0]);
    setAmount(res[0].price); // Assuming the price is in the response
  };

  useEffect(() => {
    getData();
    if (Cookies.get("cart")) {
      if (
        JSON.parse(Cookies.get("cart")).indexOf(
          Number(searchParams.get("product"))
        ) !== -1
      ) {
        setCart(true);
      } else {
        setCart(false);
      }
    } else {
      Cookies.set("cart", "[]");
    }
  }, []);

  const handleCart = () => {
    var cookiesCart = JSON.parse(Cookies.get("cart"));
    if (cart) {
      cookiesCart = cookiesCart.filter((item) => item !== 1);
    } else {
      cookiesCart.push(Number(searchParams.get("product")));
    }
    Cookies.set("cart", JSON.stringify(cookiesCart));
    setCart(!cart);
  };

  // const buy = () => {
  //   if (Cookies.get("user") && Cookies.get("userID")) {
  //     const result = axiosData("/process-payment", {
  //       body: JSON.stringify({
  //         orderReferenceId: "ORDER_REFERENCE_ID",
  //         amount: product.price,
  //       }),
  //     })

  //     if(result) {
  //       toast.success('決済が完了しました。')
  //     }
  //   } else {
  //     toast.info("会員登録をすることで商品を購入することができます。");
  //   }
  // };

  return (
    <Container sx={{ ...styles.container }}>
      {product && (
        <Grid container spacing={2} sx={{ ...styles.grid }}>
          <Grid item xs={12} sm={6} md={4} sx={{ ...styles.gridItem1 }}>
            <Box
              id="productImg"
              sx={{
                ...styles.img,
                backgroundImage:
                  "url(/assets/img/products/" + product.img + ")",
              }}
            ></Box>
            <Box sx={{ ...styles.cardBox }}>
              <Typography sx={{ ...styles.cardReviewTxt }}>
                カスタマーレビュー
              </Typography>
              <Box sx={{ ...styles.cardReview }}>
                <Typography sx={{ ...styles.cardMark }}>
                  {product.review}
                </Typography>
                <Rating
                  name="text-feedback"
                  value={Number(product.review)}
                  readOnly
                  precision={0.1}
                  emptyIcon={<StarIcon sx={{ color: "white" }} />}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8} sx={{ ...styles.gridItem2 }}>
            <Typography sx={{ ...styles.typeTxt }}>
              {displayText[product.type]}
            </Typography>
            <Box sx={{ ...styles.reviewBox }}>
              <Typography sx={{ ...styles.reviewTxt }}>
                カスタマーレビュー
              </Typography>
              <Box sx={{ ...styles.reviewSubBox }}>
                <Typography sx={{ ...styles.cardReviewMark }}>
                  {product.review}
                </Typography>
                <Rating
                  name="text-feedback"
                  value={Number(product.review)}
                  readOnly
                  precision={0.1}
                  emptyIcon={<StarIcon />}
                />
              </Box>
            </Box>
            <Box sx={{ ...styles.priceContainer }}>
              <Typography sx={{ ...styles.price }}>¥{product.price}</Typography>
              {product.preprice && (
                <Typography sx={{ ...styles.prePrice }}>
                  ¥{product.preprice}
                </Typography>
              )}
              {product.preprice && (
                <Typography sx={{ ...styles.discount }}>
                  -
                  {Math.floor(
                    ((product.preprice - product.price) * 100) /
                      product.preprice
                  )}
                  %
                </Typography>
              )}
            </Box>
            <Typography sx={{ ...styles.sizeTxt }}>サイズ</Typography>
            <Box sx={{ ...styles.sizeContainer }}>
              {JSON.parse(product.size).map((ele, idx) =>
                ele ? (
                  <Typography sx={{ ...styles.size }}>
                    {filterItems.size.value[idx]}
                  </Typography>
                ) : null
              )}
            </Box>
            <Typography sx={{ ...styles.infoTxt }}>
              {displayText[product.matchType]} ・ {displayText[product.casual]}
            </Typography>
            <Typography sx={{ ...styles.intro }}>{product.intro}</Typography>
            <Box sx={{ ...styles.footer }}>
              {/* <Button
                variant="contained"
                sx={{ ...styles.button }}
                size="large"
                onClick={buy}
              >
                今すぐ購入する
              </Button> */}
              <AmazonPayButton amount={amount} />
              {cart ? (
                <Button
                  variant="contained"
                  sx={{ ...styles.button }}
                  size="large"
                  onClick={handleCart}
                >
                  カートから取り出す
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ ...styles.button }}
                  size="large"
                  onClick={handleCart}
                >
                  カートに入れる
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
