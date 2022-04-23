import useStyle from "../../utils/styles";
import Nextlink from "next/link";
import db from "../../utils/db";
import Product from "../../models/Product";
import { Container } from "@material-ui/core";
import ForYou from "../../components/for_you";
function Doc(props) {
  const { params, Products } = props;
  const classes = useStyle();
  let currency = "$";
  return (
    <Container className={classes.container}>
      <ForYou Products={Products} Name={params} />
    </Container>
  );
}
export default Doc;

export async function getServerSideProps(context) {
  const params = context.params.params;
  await db.connect();
  const products = await Product.find({ category: params }).lean();
  await db.disconnect();
  return {
    props: {
      Products: products.map(db.convertDocumentToObject),
      params,
    },
  };
}