import { toMatchSnapshot, render, screen, userEvent } from 'test-utils';
import ItemList from '..';

const data = [
  {
    id: 'b2cbb858-7a56-4ae1-bdf9-eaa62a417257',
    createdAt: '2021-10-11T12:45:05.685Z',
    updateAt: '2021-10-11T12:45:05.685Z',
    jobId: '4165edeb-19ab-4668-8ddd-009b38205e0a',
    profileId: 'f005dc18-698c-45eb-9bc2-e470a94abc94',
    role: 'Engenheiro de Software',
    company: 'TQI',
    city: 'Uberlândia',
    state: 'Minas Gerais',
    startDate: '2020-10-11T12:44:59.000Z',
    endDate: '2021-10-11T12:44:59.000Z',
    job: {
      id: '4165edeb-19ab-4668-8ddd-009b38205e0a',
      type: 'FULL_TIME',
      description: 'Tempo integral',
    },
  },
  {
    id: 'd5b37c62-ee40-4627-aa9e-7daa4a09e46a',
    createdAt: '2021-10-11T13:00:19.418Z',
    updateAt: '2021-10-11T13:00:19.418Z',
    jobId: '4165edeb-19ab-4668-8ddd-009b38205e0a',
    profileId: 'f005dc18-698c-45eb-9bc2-e470a94abc94',
    role: 'Pedreiro',
    company: '',
    city: 'Jeceaba',
    state: 'Minas Gerais',
    startDate: '2020-10-11T12:59:37.000Z',
    endDate: '2022-10-11T12:59:37.000Z',
    job: {
      id: '4165edeb-19ab-4668-8ddd-009b38205e0a',
      type: 'FULL_TIME',
      description: 'Tempo integral',
    },
  },
];

// eslint-disable-next-line react/prop-types
const ItemTemplate = ({ item }) => <div>{item.role}</div>;

it('should match snapshot', () => {
  toMatchSnapshot(
    <ItemList
      items={data}
      deleteItem={() => {}}
      editItem={() => {}}
      id="test"
      ItemTemplate={ItemTemplate}
    />,
  );
});

it('should call functions on button click', async () => {
  const deleteItem = jest.fn();
  const editItem = jest.fn();
  render(
    <ItemList
      items={data}
      deleteItem={deleteItem}
      editItem={editItem}
      id="test"
      ItemTemplate={ItemTemplate}
    />,
  );

  userEvent.click(screen.getByTestId('edit-test-0'));
  expect(editItem).toHaveBeenCalledTimes(1);

  userEvent.click(screen.getByTestId('delete-test-0'));
  userEvent.click(await screen.findByTestId('modal-confirm'));
  expect(deleteItem).toHaveBeenCalledTimes(1);
});
