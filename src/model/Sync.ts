import axios, { AxiosResponse, AxiosPromise } from 'axios';

interface IHasId {
  id?: number;
}

export class Sync<T extends IHasId> {
  constructor(private rootUrl: string) {}

  fetch = async (id: number): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.get(
        `${this.rootUrl}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  save = (data: T): AxiosPromise => {
    const { id } = data;
    try {
      if (id) {
        return axios.put(`${this.rootUrl}/${id}`, data);
      } else {
        return axios.post(this.rootUrl, data);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
