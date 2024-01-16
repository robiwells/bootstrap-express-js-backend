import '../../paths';
import { UsersService } from '../../../components/users/users-service';
import assert from 'assert';
import { DefaultUserDAO } from 'components/users/users-dao';

// Normally, we would use a mock library like Sinon to mock the DAO.
// But as our DAO reads/write to a collection in memory, we can just use the real DAO.
let userService: UsersService;

const userEmail = 'test@robwells.dev';
const userName = 'robwells';

describe('Users Service', () => {
  describe('addUser', () => {
    before('add user to db', async () => {
      userService = new UsersService(new DefaultUserDAO());
    });

    it('should add a new user', async () => {
      const response = await userService.addUser(userName, userEmail);

      assert(response);
      assert(response.username === userName);
      assert(response.email === userEmail);
      assert(response.id === 0);
    });

    describe('getUser', () => {
      before('add user to db', async () => {
        userService = new UsersService(new DefaultUserDAO());
        await userService.addUser(userName, userEmail);
      });

      it('should get a user by ID', async () => {
        const response = await userService.getUser(0);

        assert(response);
        assert(response.username === userName);
        assert(response.email === userEmail);
      });
    });

    describe('updateUser', () => {
      before('add user to db', async () => {
        userService = new UsersService(new DefaultUserDAO());
        await userService.addUser(userName, userEmail);
      });

      it('should update a user', async () => {
        const newEmail = 'test-express@robwells.dev';
        const newUserName = 'robwells-express';
        const response = await userService.updateUser(0, newUserName, newEmail);

        assert(response);
        assert(response.username === newUserName);
        assert(response.email === newEmail);
      });
    });

    describe('deleteUser', () => {
      before('add user to db', async () => {
        userService = new UsersService(new DefaultUserDAO());
        await userService.addUser(userName, userEmail);
      });

      it('should delete a user', async () => {
        const response = await userService.deleteUser(0);

        assert(response);
        assert(response === true);
      });
    });
  });
});
