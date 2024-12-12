import {Box, Button, Container, Grid, Rating, Typography,} from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useSearchParams } from "react-router-dom";
import { axiosData } from "../../util/api";
import { displayText, filterItems } from "../../util/filterItems";
import Cookies from "js-cookie";
import { styles } from "../styles/productDetailStyle";
import { toast } from "react-toastify";
import AmazonPayButton from "./amazonPayBtn";
import QuantityInput from "./quantityInput";

export default function ProductDetail() {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(false);
  const [amount, setAmount] = useState('0.00'); // Default amount
  const validAmount = !isNaN(amount) && amount > 0;
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(price);
  };
  const productID = searchParams.get("product");
  
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axiosData("/getProductByProductID", { id: productID });
      console.log(res, "<<<<<<<<<< res");
      setProduct(res[0]);
      setAmount(res[0].price);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error('商品の情報を取得できませんでした。'); // Failed to fetch product details
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getData();
    const cartItems = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];
    setCart(cartItems.includes(Number(searchParams.get("product"))));
  }, [searchParams]);

  const handleCart = () => {
    const cartItems = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];
    if (cart) {
      Cookies.set(
        "cart",
        JSON.stringify(cartItems.filter((item) => item !== Number(searchParams.get("product"))))
      );
    } else {
      cartItems.push(Number(searchParams.get("product")));
      Cookies.set("cart", JSON.stringify(cartItems));
    }
    setCart(!cart);
  };

  const addProductIntoStorage = () => {
    localStorage.removeItem("selectedProduct");
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    console.log("Product saved to localStorage:", product);
  };
  
  if (loading) {
    return <Typography>読み込み中...</Typography>; // Loading...
  }
  
  if (!product) {
    return <Typography>商品の情報が見つかりません。</Typography>;
  }
  
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
                  emptyIcon={<StarIcon sx={{ color: "white" }}
                  aria-label="Product rating" />}
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
            <Typography sx={{ ...styles.price }}>{formatPrice(product.price)}</Typography>
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
                  <Typography sx={{ ...styles.size }} key={idx}>
                    {filterItems.size.value[idx]}
                  </Typography>
                ) : null
              )}
            </Box>
            <Typography sx={{ ...styles.infoTxt }}>
              {displayText[product.matchType]} ・ {displayText[product.casual]}
            </Typography>
            <Typography sx={{ ...styles.intro }}>{product.intro}</Typography>
            {/* <QuantityInput/> */}

            <Box sx={{ ...styles.footer }}>
              {validAmount && 
              <AmazonPayButton 
                amount={amount} 
                handleAmazonPayClick={addProductIntoStorage}
              />}
              <Button
                variant="contained"
                sx={{ ...styles.button }}
                size="large"
                onClick={handleCart}
                aria-label={cart ? "Remove from cart" : "Add to cart"}
              >
                {cart ? "カートから取り出す" : "カートに入れる"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
