//
//  DTOs.swift
//  ExamPrep
//
//  Created by Mohammad Azam on 11/4/23.
//

import Foundation

struct RegistrationResponse: Codable {
    let success: Bool
    var message: String? = ""
}

struct LoginResponse: Codable {
    let success: Bool
    let message: String?
    let token: String?
}
