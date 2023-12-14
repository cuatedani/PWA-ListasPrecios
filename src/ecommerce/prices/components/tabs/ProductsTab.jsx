import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable, {
  MRT_ToggleDensePaddingButton,
  MRT_FullScreenToggleButton,
} from "material-react-table";
import { toast } from "react-toastify";
import { Dialog, Stack, Tooltip, darken } from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, Button, IconButton } from "@mui/material";
import { PRODUCTS_COLUMS } from "../../../../constants/columsTables";
import AddProduct from "../modals/AddProduct";
import UpdateProduct from "../modals/UpdateProduct";
import BarActionsTable from "../../../../components/elements/bars/BarActionsTable";
import { useProductsContext } from "../../pages/ProductsProvider";
import { deleteProduct } from "../../../../services/delete";
import {
  showMensajeConfirm,
  showMensajeError,
} from "../../../../components/elements/messages/MySwalAlerts";


const ProductsTab = () => {
  const {
    products,
    productSel,
    setProductSel,
    fetchDataProducts,
    fetchDataProductSelect,
    loadingTable,
    showToastExito,
    setIdSelectedRowProduct,
    idSelectedRowProduct,
  } = useProductsContext();
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const columns = useMemo(() => PRODUCTS_COLUMS);
  const handleDelete = async () => {
    const res = await showMensajeConfirm(
      `El producto con el ID ${productSel.IdProdServOK} será eliminado, ¿Desea continuar?`
    );
    if (res) {
      try {
        await deleteProduct(productSel.IdProdServOK);
        setProductSel(null);
        fetchDataProducts();
        showToastExito("Se eliminó el Producto");
        handleReload();
      } catch (e) {
        console.error("ERROR: no se pudo eliminar en <handleDelete>");
        showMensajeError(
          `No se pudo Eliminar el Pruducto ${productSel.IdProdServOK} `
        );
      }
    }
  };
  const handleReload = async () => {
    await fetchDataProducts();
    if (productSel) await fetchDataProductSelect(productSel.IdProdServOK);
    setIdSelectedRowProduct(null);
    setProductSel(null);
  };
  return (
    <Box>
      <Box className="box-tables">
        <MaterialReactTable
          columns={columns}
          data={products}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          enableColumnActions={false}
          localization={MRT_Localization_ES}
          enableStickyHeader
          enableStickyFooter
          muiTableContainerProps={{
            className: "table-container",
          }}
          renderTopToolbarCustomActions={() => (
            <>
              {/* Barra de Table Accions */}
              <BarActionsTable
                handleBtnAdd={() => setOpenAddProduct(true)}
                handleBtnUpdate={() => setOpenUpdateProduct(true)}
                handleBtnDelete={() => handleDelete()}
                // handleBtnDetails={() => console.log("clic handleBtnDetails")}
                handleBtnReload={() => handleReload()}
                isItemSelected={!!productSel}
              />
            </>
          )}
          muiTableBodyRowProps={({ row }) => ({
            //CLIC EN UN ROW
            onClick: (event) => {
              console.log("ROW", row.original, "ID", row.id);
              setProductSel(row.original);
              setIdSelectedRowProduct(row.id);
            },
            sx: {
              //FIC: si esta cargando no debes dar click aun
              cursor: loadingTable ? "not-allowed" : "pointer",
              backgroundColor:
                idSelectedRowProduct === row.id
                  ? darken("#EFF999", 0.01)
                  : "inherit",
            },
          })}
        />
      </Box>
      {/* M O D A L E S */}
      <Dialog open={openAddProduct}>
        <AddProduct
          fetchDataProducts={fetchDataProducts}
          openAddProduct={openAddProduct}
          handleReload={handleReload}
          setOpenAddProduct={setOpenAddProduct}
          onClose={() => setOpenAddProduct(false)}
        />
      </Dialog>
      <Dialog open={openUpdateProduct}>
        <UpdateProduct
          fetchDataProducts={fetchDataProducts}
          productSel={productSel}
          openUpdateProduct={openUpdateProduct}
          handleReload={handleReload}
          setOpenUpdateProduct={setOpenUpdateProduct}
          onClose={() => setOpenAddProduct(false)}
        />
      </Dialog>
    </Box>
  );
};
export default ProductsTab;