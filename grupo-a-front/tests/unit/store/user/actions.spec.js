import axios from "@/axios";
import moxios from "moxios";
import userActions from "@/store/user/actions";

describe("Actions: User", () => {
  const env = Object.assign({}, process.env),
    resp = jest.fn();

  beforeEach(() => {
    process.env = env;
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  describe("#getUsers", () => {
    const param = { id: 1 };
    beforeEach(() => {
      resp.mockClear();
      userActions.getUsers({}, param).then(resp);
    });

    test("should be a GET method", done => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: "ok"
          })
          .then(() => {
            expect(resp.mock.calls[0][0].config.method).toBe("get");
            done();
          });
      });
    });

    test("should call with correct url", done => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: "ok"
          })
          .then(() => {
            const url = resp.mock.calls[0][0].config.url;
            expect(url).toBe(`http://localhost:8080/api/users`);
            done();
          });
      });
    });
  });

  describe("#saveUser", () => {
    const param = { id: 1 };
    beforeEach(() => {
      resp.mockClear();
      userActions.saveUser({}, param).then(resp);
    });

    test("should be a POST method", done => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: "ok"
          })
          .then(() => {
            expect(resp.mock.calls[0][0].config.method).toBe("post");
            done();
          });
      });
    });

    test("should call with correct url", done => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: "ok"
          })
          .then(() => {
            const url = resp.mock.calls[0][0].config.url;
            expect(url).toBe(`http://localhost:8080/api/users`);
            done();
          });
      });
    });
  });

  describe("#editUser", () => {
    const param = { ra: 1 };
    beforeEach(() => {
      resp.mockClear();
      userActions.editUser({}, param).then(resp);
    });

    test("should be a PUT method", done => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: "ok"
          })
          .then(() => {
            expect(resp.mock.calls[0][0].config.method).toBe("put");
            done();
          });
      });
    });

    test("should call with correct url", done => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: "ok"
          })
          .then(() => {
            const url = resp.mock.calls[0][0].config.url;
            expect(url).toBe(`http://localhost:8080/api/users/${param.ra}`);
            done();
          });
      });
    });
  });

  describe("#deleteUser", () => {
    const ra = 1;
    beforeEach(() => {
      resp.mockClear();
      userActions.deleteUser({}, ra).then(resp);
    });

    test("should be a DELETE method", done => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: "ok"
          })
          .then(() => {
            expect(resp.mock.calls[0][0].config.method).toBe("delete");
            done();
          });
      });
    });

    test("should call with correct url", done => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: "ok"
          })
          .then(() => {
            const url = resp.mock.calls[0][0].config.url;
            expect(url).toBe(`http://localhost:8080/api/users/${ra}`);
            done();
          });
      });
    });
  });
});
