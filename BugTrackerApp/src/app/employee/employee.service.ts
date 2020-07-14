import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Employee } from "./employee.model";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<Employee[]>("http://localhost:5000/api/users");
  }
  findEmployees(searchQuery, excludedIds?) {
    return this.http.get<Employee[]>("http://localhost:5000/api/users", { params: { searchQuery, excludedIds } });
  }
  findEmployeesByTeam(teamId: string) {
    return this.http.get<Employee[]>(`http://localhost:5000/api/teams/${teamId}/employees`);
  }

  filterEmployeesArray(arr, query) {
    const searchQuery = query.toLowerCase().split(" ");
    return arr.filter((e) => {
      if (searchQuery.length === 1) {
        return (
          e.firstName.toLowerCase().indexOf(searchQuery[0]) >= 0 ||
          e.lastName.toLowerCase().indexOf(searchQuery[0]) >= 0 ||
          e.email.toLowerCase().indexOf(searchQuery[0]) >= 0
        );
      } else {
        return (
          (e.firstName.toLowerCase().indexOf(searchQuery[0]) >= 0 && e.lastName.toLowerCase().indexOf(searchQuery[1]) >= 0) ||
          (e.firstName.toLowerCase().indexOf(searchQuery[1]) >= 0 && e.lastName.toLowerCase().indexOf(searchQuery[0]) >= 0)
        );
      }
    });
  }
}