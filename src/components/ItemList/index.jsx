import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from 'components/IconButton';
import { Wrapper, Container } from './style';

const ItemList = ({ items, deleteItem, editItem, id, ItemTemplate }) => (
  <Paper component={Container}>
    <List component={Wrapper} role="list">
      {items?.map((item, index) => (
        <ListItem
          key={item.id}
          divider={index !== items.length - 1}
          role="listitem"
        >
          <ItemTemplate item={item} />

          <ListItemSecondaryAction>
            {editItem && (
              <IconButton
                color="primary"
                tooltip="Editar"
                onClick={() => editItem(item)}
                // eslint-disable-next-line prefer-template
                id={'edit-' + id + '-' + index}
              >
                <EditIcon />
              </IconButton>
            )}
            <IconButton
              tooltip="Deletar"
              onClick={() => deleteItem(item.id)}
              // eslint-disable-next-line prefer-template
              id={'delete-' + id + '-' + index}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </Paper>
);

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func,
  id: PropTypes.string.isRequired,
  ItemTemplate: PropTypes.any.isRequired,
};

export default ItemList;
