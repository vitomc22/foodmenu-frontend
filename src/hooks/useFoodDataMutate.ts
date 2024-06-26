import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/foodData";
import { useMutation, useQueryClient } from '@tanstack/react-query';
const API_URL = 'http://localhost:8080'

const postData = async (data: FoodData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/food', data);
    return response;
}

const putData = async (data: FoodData): AxiosPromise<any> => {
    const response = axios.put(API_URL + '/food', data);
    return response;
}

export const deleteData = async (data: FoodData): AxiosPromise<any> => {
    const response = axios.delete(API_URL + '/food/' + data.id);
    return response;
}

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])

        }
    })
    return mutate;
}

export function useFoodDataUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])

        }
    })
    return mutate;
}

export function useFoodDataDelete() {
    const mutate = useMutation({
        mutationFn: deleteData,
        onSuccess: () => {
            alert("removido com sucesso!");
        },
        onError: () => {
            alert("Algo deu errado..");
        }

    })
    return mutate;
}