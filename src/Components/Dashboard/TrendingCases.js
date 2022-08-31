import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MaterialTable from 'material-table';
import * as XLSX from 'xlsx'
// import PrintIcon from '@material-ui/icons/Print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const cases = [
  {
    id: uuid(),
    name: 'FGM',
    imageUrl: '/static/images/products/fgm.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Child labour',
    imageUrl: '/static/images/products/childlabour.jpg',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Domestic violence',
    imageUrl: '/static/images/products/domesticviolence.png',
    updatedAt: subHours(Date.now(), 3)
  },
  {
    id: uuid(),
    name: 'Police harassment',
    imageUrl: '/static/images/products/policebrutality.jpg',
    updatedAt: subHours(Date.now(), 5)
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: subHours(Date.now(), 9)
  }
];

const TrendingCases = (props) => {
  const columns = [
    { title: "Case Name", field: "name", },
    { title: "Total", field: "updatedAt", },
    { title: "Unresolved", field: "year", type: "numeric" },
    { title: "resolved", field: 'fee', type: "numeric" }]

  const downloadExcel = () => {
    const newData = cases.map(row => {
      delete row.tableData
      return row
    })
    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "cases")
    //Buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    //Download
    XLSX.writeFile(workBook, "cases.xlsx")


  }
  const logo = '/static/images/humanrightslogo.png'
  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.text("All Cases", 20, 10)
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: cases
    })
    doc.save('cases.pdf')
  }

  return (
    <Card {...props}>
    <CardHeader
      subtitle={`${cases.length} in total`}
      title="All Cases"
    />
    <Divider />
    <List
    sx={{display: 'flex',
        flexDirection: 'column'
        }}
    >
      {cases.map((product, i) => (
        <ListItem
          divider={i < cases.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`Updated ${formatDistanceToNow(product.updatedAt)}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        onClick={downloadPdf}
        color="primary"
        endIcon={<ArrowDownward />}
        size="small"
        variant="text"
      >
        Download pdf
      </Button>
      <Button
        onClick={downloadExcel}
        color="primary"
        endIcon={<ArrowDownward />}
        size="small"
        variant="text"
      >
        Save to excel
      </Button>
    </Box>
  </Card>
  )
  
};

export default TrendingCases
