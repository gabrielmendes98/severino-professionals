import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import showDeleteModal from 'components/Modal/showModalCommons/showDeleteModal';
import IconButton from 'components/IconButton';
import {
  Wrapper,
  Container,
  ItemTemplateContainer,
  ItemTemplateActions,
} from './style';

const ItemList = ({ items, deleteItem, editItem, id, ItemTemplate }) => (
  <Paper component={Container}>
    <List component={Wrapper} role="list">
      {items?.map((item, index) => (
        <ListItem
          key={item.id}
          divider={index !== items.length - 1}
          role="listitem"
        >
          <ItemTemplateContainer>
            <ItemTemplate item={item} />
          </ItemTemplateContainer>

          <ItemTemplateActions>
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
              onClick={() =>
                showDeleteModal({ onConfirm: () => deleteItem(item.id) })
              }
              // eslint-disable-next-line prefer-template
              id={'delete-' + id + '-' + index}
            >
              <DeleteIcon />
            </IconButton>
          </ItemTemplateActions>
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
