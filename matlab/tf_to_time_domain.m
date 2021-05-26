% Convert transfer function to time domain.
% This script converts the different combinations of controller, system
% and measuring element into equations in the time domain.
% This is needed in the javascript part of the educational tool.
clear; close all; clc

% General syms-definitions.
syms s 
% Controller syms-definitions.
syms K_R T_I T_D T_N T_V 
% System syms-definitions.
syms K_S T_S D omega
% Measuring element syms-definitions.
syms K_M T_M

% Define all possible input-transfer-functions.
input_functions = [
    struct( 'name', 'step', ...
            'function', 1/s),           %#ok<*COMNL>
    struct( 'name', 'impulse', ...
            'function', 1), 
    struct( 'name', 'sinus', ...
            'function', 1 / (s^2 + 1))
];

% Define all possible controller-transfer-functions. 
controller_functions = [
    struct( 'name', 'P', ...
            'function', K_R),
    struct( 'name', 'I', ...
            'function', 1 / (T_I * s)),
    struct( 'name', 'D', ...
            'function', T_D * s),
    struct( 'name', 'PI', ...
            'function', K_R + 1 / (T_I * s)),
    struct( 'name', 'PD', ...
            'function', K_R + T_D * s),
    struct( 'name', 'PID', ...
            'function', K_R * (1 + (1 / (T_N * s)) + T_V * s)),
];

% Define all possible system-transfer-functions.
system_functions = [
    struct( 'name', 'P', ...
            'function', K_S),
    struct( 'name', 'PT1', ...
            'function', K_S / (T_S * s + 1)),
    struct( 'name', 'PT2', ...
            'function', (K_S * omega^2) / (s^2 + 2 * D * omega * s + omega^2))
];

% Define all possible measuring-element-transfer-functions.
measuring_functions = [
    struct( 'name', 'P', ...
            'function', K_M),
%    struct( 'name', 'PT1', ...
%            'function', K_M / (T_M * s + 1))
];


% Iterate through all combinations and print the
% controller-time-domain-function and output-time-domain-function.
n_combination = 1;
for i_U = 1:length(input_functions)
    U = input_functions(i_U);
    for i_G_R = 1:length(controller_functions)
        G_R = controller_functions(i_G_R);
        for i_G_S = 1:length(system_functions)
            G_S = system_functions(i_G_S);
            for i_G_M = 1:length(measuring_functions)
                G_M = measuring_functions(i_G_M);
                % Print informations about the current combination.
                disp(['Combination #', num2str(n_combination), ':'])
                disp(['Input: ', U.name])
                disp(['Controller: ', G_R.name])
                disp(['System: ', G_S.name])
                disp(['Measuring element: ', G_M.name])
                disp(' ')
                n_combination = n_combination + 1;
                % Calculate the controller-time-domain-function.
                controller_output = ilaplace((U.function * G_R.function) / ...
                    (1 + G_R.function * G_S.function * G_M.function));
                pretty(controller_output)
                % Calculate the output-time-domain-function.
                control_loop_output = ilaplace((U.function * G_R.function * G_M.function) / ...
                    (1 + G_R.function * G_S.function * G_M.function));
                pretty(control_loop_output)
                % Convert with vpa.
                vpa_function = vpa(control_loop_output);
                pretty(vpa_function)
            end
        end
    end
end